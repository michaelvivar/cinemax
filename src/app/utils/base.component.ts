import { FormBuilder, FormGroup } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Subscription } from "rxjs";
import { MatDialog, MatTableDataSource, MatPaginator } from "@angular/material";
import { ConfirmDialog } from "../components/confirm-dialog/confirm-dialog.component";
import { AlertDialog } from "../components/alert-dialog/alert-dialog.component";
import { ViewChild } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { DomSanitizer } from "@angular/platform-browser";
import { ServiceLocator } from "./service-locator";
import { safeHtml } from "./html-helper";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Location } from "@angular/common";
import { ResetSeat } from "@stores/actions/seat.actions";
import { SetPageConfirmExit } from "@stores/actions/app.actions";

export abstract class BaseComponent {

    constructor() {
        this.dialog = ServiceLocator.injector.get(MatDialog);
        this.domSanitizer = ServiceLocator.injector.get(DomSanitizer);
        this.store = ServiceLocator.injector.get(Store);
        this.location = ServiceLocator.injector.get(Location);
    }

    protected store: Store;
    protected dialog: MatDialog;
    protected domSanitizer: DomSanitizer;
    protected location: Location;


    protected title: string;
    private subscriptions: Subscription[] = [];

    set subscription(value: Subscription) {
        this.subscriptions.push(value);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(o => o.unsubscribe());
        console.log('Destroyed!', this.subscriptions.length);
        this.store.dispatch(new ResetSeat());
    }

    alert(message: string, title?: string) {
        if (this.domSanitizer) {
            message = <any>safeHtml(message);
        }
        if (this.dialog) {
            let dialogRef = this.dialog.open(AlertDialog, {
                width: '300px',
                data: { message, title }
            });
        
            return dialogRef.afterClosed().toPromise();
        }
    }

    confirm(message: string, title?: string): Promise<boolean> {
        if (this.domSanitizer) {
            message = <any>safeHtml(message);
        }
        if (this.dialog) {
            let dialogRef = this.dialog.open(ConfirmDialog, {
                width: '400px',
                data: { message, title }
            });
        
            return dialogRef.afterClosed().toPromise();
        }
    }

    sortBy = (...fields: string[]) => (a, b) => fields.map(o => {
        let dir = 1;
        if (o[0] === '-') { dir = -1; o=o.substring(1); }
        return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
    }).reduce((p, n) => p ? p : n, 0);

    back() {
        this.location.back();
    }
}

export abstract class FormBaseComponent extends BaseComponent {

    constructor() {
        super();
        this.store = ServiceLocator.injector.get(Store);
        this.formbuilder = ServiceLocator.injector.get(FormBuilder);
        this.form = this.formbuilder.group([]);

        this.form.valueChanges.pipe(debounceTime(500)).pipe(distinctUntilChanged()).subscribe(values => {
            this.validate(values);
        })
    }

    validate(values: any) {}

    protected store: Store;
    protected formbuilder: FormBuilder;

    ngAfterContentInit() {
        this.subscription = this.form.valueChanges.subscribe(data => {
            if (this.dirty == false) {
              this.store.dispatch(new SetPageConfirmExit());
              this.dirty = true;
            }
        })
    }

    private dirty: boolean = false;
    protected form: FormGroup;
    protected id: any;
}

export abstract class TableBaseComponent extends BaseComponent {

    data = new MatTableDataSource([]);
    columns: string[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    selection = new SelectionModel<any>(true, []);

    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.data.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.data.data.forEach(row => this.selection.select(row));
    }

    abstract filter(data: any, filter: string);
}