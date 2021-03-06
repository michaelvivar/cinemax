import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TheaterService } from '@services/theater.service';
import { FormBaseComponent } from '@utils/base.component';
import { Theater } from '@models/theater.model';
import { RemovePageConfirmExit } from '@stores/actions/app.actions';

@Component({
  selector: 'app-theater-form',
  templateUrl: './theater-form.component.html',
  styles: []
})
export class TheaterFormComponent extends FormBaseComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TheaterService
  ) { super() }

  ngOnInit() {
    this.title = 'Add Theater';
    this.form.addControl('name', new FormControl(null, Validators.required));
    this.form.addControl('status', new FormControl(true));

    if (this.id = this.route.snapshot.params['id']) {
      this.title = 'Edit Theater';
      const theater = this.route.snapshot.data['theater'] as Theater;
      this.form.controls['name'].setValue(theater.name);
      this.form.controls['status'].setValue(theater.status);
    }
  }

  save() {
    if (this.form.valid) {
      this.form.markAsUntouched();
      this.store.dispatch(new RemovePageConfirmExit());
      if (this.id) {
        this.service.update(this.id, this.form.value).then(() => {
          this.router.navigate(['/admin/theater', this.id]);
        })
      }
      else {
        this.service.add(this.form.value).then(ref => {
          this.router.navigate(['admin/theater', ref.id]);
        })
      }
    }
    else {
      this.alert('Invalid form data!');
    }
  }
}
