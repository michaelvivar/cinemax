import { FormBuilder, FormGroup } from "@angular/forms";
import { Store } from "@ngxs/store";
import { SetPageConfirmExit } from "../ngxs/actions/app.actions";
import { Observable, Subscription, of } from "rxjs";
import { MatDialog, MatTableDataSource, MatPaginator } from "@angular/material";
import { ConfirmDialog } from "../components/confirm-dialog/confirm-dialog.component";
import { AlertDialog } from "../components/alert-dialog/alert-dialog.component";
import { ViewChild } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { SafeHtml, DomSanitizer } from "@angular/platform-browser";

export abstract class BaseComponent {

    constructor(public dialog?: MatDialog, protected domSanitizer?: DomSanitizer) {}

    protected title: string;
    private subscriptions: Subscription[] = [];

    set subscription(value: Subscription) {
        this.subscriptions.push(value);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(o => o.unsubscribe());
        console.log('Destroyed!', this.subscriptions.length);
    }

    alert(message: string, title?: string) {
        if (this.domSanitizer) {
            message = <any>this.safeHtml(message);
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
            message = <any>this.safeHtml(message);
        }
        if (this.dialog) {
            let dialogRef = this.dialog.open(ConfirmDialog, {
                width: '400px',
                data: { message, title }
            });
        
            return dialogRef.afterClosed().toPromise();
        }
    }

    safeHtml(content: string): SafeHtml {
        if (this.domSanitizer) {
            return this.domSanitizer.bypassSecurityTrustHtml(content);
        }
    }

    sortBy = (...fields: string[]) => (a, b) => fields.map(o => {
        let dir = 1;
        if (o[0] === '-') { dir = -1; o=o.substring(1); }
        return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
    }).reduce((p, n) => p ? p : n, 0);
}

export abstract class FormBaseComponent extends BaseComponent {

    constructor(formbuilder: FormBuilder, protected store: Store, dialog?: MatDialog, domSanitizer?: DomSanitizer) {
        super(dialog, domSanitizer);
        this.form = formbuilder.group([]);
    }

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

    abstract save();
    abstract cancel();

}

export abstract class TableBaseComponent extends BaseComponent {

    constructor(dialog?: MatDialog, domSanitizer?: DomSanitizer) {
        super(dialog, domSanitizer);
    }

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
          this.data.data.forEach(row => this.selection.select(row.id));
    }

    abstract filter(data: any, filter: string);
}