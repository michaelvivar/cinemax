import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormArray } from '@angular/forms';
import { FormBaseComponent } from '../../../utils/base.component';
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
    private service: MovieService
  ) { super() }

  ngOnInit() {
    this.title = 'Add Movie';
    this.form.addControl('title', new FormControl(null, Validators.required));
    this.form.addControl('date', new FormControl(null, Validators.required));
    this.form.addControl('grade', new FormControl(null, Validators.required));
    this.form.addControl('runtime', new FormControl(null, [Validators.required, Validators.min(30)]));
    this.form.addControl('status', new FormControl());

    this.form.addControl('director', new FormControl(''));
    this.form.addControl('actors', this.formbuilder.array([]));
    this.addActor();

    if (this.id = this.route.snapshot.params['id']) {
      this.title = 'Edit Movie';
      const movie = this.route.snapshot.data['movie'] as Movie;
      this.form.controls['title'].setValue(movie.title);
      this.form.controls['date'].setValue(new Date(movie.date.seconds * 1000));
      this.form.controls['grade'].setValue(movie.grade);
      this.form.controls['runtime'].setValue(movie.runtime);
      this.form.controls['status'].setValue(movie.status);
      this.form.controls['director'].setValue(movie.director);
      if (movie.actors && movie.actors.length > 0) {
        this.actors.removeAt(0);
        movie.actors.forEach(o => this.addActor(o));
      }
    }
  }

  get actors(): FormArray {
    return this.form.get('actors') as FormArray;
  };

  addActor(value?: string) {
    const actor = this.formbuilder.group({ name: new FormControl(value, Validators.required)});
    this.actors.push(actor);
  }

  deleteActor(i: number) {
    this.actors.removeAt(i);
    this.form.markAsTouched();
  }

  save() {
    if (this.form.valid) {
      const actors = [];
      this.actors.controls.forEach(o => {
        if (o.value['name']) {
          actors.push(o.value['name']);
        }
      })
      const values = this.form.value;
      values['actors'] = actors;
      if (!values.director) {
        values.director = '';
      }
      this.form.markAsUntouched();
      this.store.dispatch(new RemovePageConfirmExit());
      if (this.id) {
        this.service.update(this.id, values).then(() => {
          this.router.navigate(['/admin/movie', this.id]);
        })
      }
      else {
        this.service.add(values).then(ref => {
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
