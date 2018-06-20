import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FormBaseComponent } from '../../../utils/base.component';
import { CinemaService } from '../../../services/cinema.service';
import { Cinema } from '../../../models/cinema.model';
import { RemovePageConfirmExit } from '../../../ngxs/actions/app.actions';
import { FormErrorStateMatcher } from '../../../utils/form-helper';

@Component({
  selector: 'app-cinema-form',
  templateUrl: './cinema-form.component.html',
  styles: []
})
export class CinemaFormComponent extends FormBaseComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    store: Store,
    formbuilder: FormBuilder,
    dialog: MatDialog,
    private service: CinemaService
  ) { super(formbuilder, store, dialog) }

  errorMatcher = new FormErrorStateMatcher();
  theaterId: any;

  ngOnInit() {
    this.theaterId = this.route.snapshot.params['theater'];
    this.id = this.route.snapshot.params['cinema'];
    this.title = 'Add Cinema';
    this.form.addControl('name', new FormControl(null, Validators.required));
    this.form.addControl('row', new FormControl(0, [Validators.required, Validators.min(5)]));
    this.form.addControl('column', new FormControl(0, [Validators.required, Validators.min(5)]));
    this.form.addControl('status', new FormControl(true));
    if (this.id) {
      this.title = 'Edit Cinema';
      const cinema = this.route.snapshot.data['cinema'] as Cinema;
      this.form.get('name').setValue(cinema.name);
      this.form.get('status').setValue(cinema.status);
      this.form.get('row').setValue(cinema.row);
      this.form.get('column').setValue(cinema.column);
    }
  }

  save() {
    if (this.form.valid) {
      this.form.markAsUntouched();
      this.store.dispatch(new RemovePageConfirmExit());
      if (this.id) {
        this.service.update(this.theaterId, this.id, this.form.value).then(() => {
          this.router.navigate(['/admin/cinema/', this.theaterId, this.id]);
        })
      }
      else {
        this.service.add(this.theaterId, this.form.value).then(ref => {
          this.router.navigate(['/admin/cinema/', this.theaterId, ref.id]);
        })
      }
    }
    else {
      this.alert('Invalid form data!');
    }
  }

  cancel() {
    if (this.id) {
      this.router.navigate(['/admin/cinema/', this.theaterId, this.id]);
    }
    else {
      this.router.navigate(['/admin/theater/', this.theaterId]);
    }
  }

}
