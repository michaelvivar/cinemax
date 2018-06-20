import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { FormBaseComponent } from '../../../utils/base.component';
import { MatDialog } from '@angular/material';
import { Movie } from '../../../models/movie.model';
import { MovieService } from '../../../services/movie.service';
import { RemovePageConfirmExit } from '../../../ngxs/actions/app.actions';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styles: []
})
export class MovieFormComponent extends FormBaseComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    store: Store,
    formbuilder: FormBuilder,
    dialog: MatDialog,
    private service: MovieService
  ) { super(formbuilder, store, dialog) }

  ngOnInit() {
    this.title = 'Add Movie';
    this.form.addControl('title', new FormControl(null, Validators.required));
    this.form.addControl('date', new FormControl(null, Validators.required));
    this.form.addControl('grade', new FormControl(null, Validators.required));
    this.form.addControl('runtime', new FormControl(null, [Validators.required, Validators.min(30)]));
    this.form.addControl('status', new FormControl());

    if (this.id = this.route.snapshot.params['id']) {
      this.title = 'Edit Movie';
      const movie = this.route.snapshot.data['movie'] as Movie;
      this.form.controls['title'].setValue(movie.title);
      this.form.controls['date'].setValue(new Date(movie.date.seconds * 1000));
      this.form.controls['grade'].setValue(movie.grade);
      this.form.controls['runtime'].setValue(movie.runtime);
      this.form.controls['status'].setValue(movie.status);
    }
  }

  save() {
    if (this.form.valid) {
      this.form.markAsUntouched();
      this.store.dispatch(new RemovePageConfirmExit());
      if (this.id) {
        this.service.update(this.id, this.form.value).then(() => {
          this.router.navigate(['/admin/movie', this.id]);
        })
      }
      else {
        this.service.add(this.form.value).then(ref => {
          this.router.navigate(['/admin/movie', ref.id]);
        })
      }
    }
    else {
      this.alert('Invalid form data!');
    }
  }

  cancel() {
    if (this.id) {
      this.router.navigate(['/admin/movie', this.id]);
    }
    else {
      this.router.navigate(['/admin/movies']);
    }
  }

  //ngAfterContentInit() {}

}
