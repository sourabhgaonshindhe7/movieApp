// src/app/components/add-movie/add-movie.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';
import { Movie } from 'src/assets/model/movie.model';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  movieForm: FormGroup;
  movieId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      castMember: ['', Validators.required],
      genre: ['', Validators.required],
      releaseYear: ['', [Validators.required, Validators.min(1800)]],
      publishReview: [false]
    });
  }

  ngOnInit(): void {
    this.movieId = +this.route.snapshot.paramMap.get('id')!;
    if (this.movieId) {
      const movie = this.movieService.getMovieById(this.movieId);
      if (movie) {
        this.movieForm.patchValue(movie);
      }
    }
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const movie: Movie = this.movieForm.value;
      if (this.movieId) {
        movie.id = this.movieId;
        this.movieService.updateMovie(movie);
      } else {
        this.movieService.addMovie(movie);
      }
      this.router.navigate(['/']);
    }
  }
}
