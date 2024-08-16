// src/app/services/movie.service.ts
import { Injectable } from '@angular/core';
import { Movie } from '../../assets/model/movie.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly STORAGE_KEY = 'movies';

  constructor() {}

  getAllMovies(): Movie[] {
    const movies = localStorage.getItem(this.STORAGE_KEY);
    return movies ? JSON.parse(movies) : [];
  }

  getMovieById(id: number): Movie | undefined {
    return this.getAllMovies().find((movie) => movie.id === id);
  }

  getMovies(offset: number, pageSize: number) {
    const movies = this.getAllMovies();
    const pagedMovies = movies.slice(offset, offset + pageSize);
    return of({ movies: pagedMovies, total: movies.length });
  }

  addMovie(movie: Movie): void {
    const movies = this.getAllMovies();
    movie.id = movies.length ? Math.max(...movies.map(m => m.id)) + 1 : 1;
    movies.push(movie);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(movies));
  }

  // addComment(commentData: any): Observable<void> {
  //   // Implementation will depend on how you manage comments in local storage
  //   return of(void 0);
  // }


  getComments(movieId: number): any[] {
    const movies = this.getAllMovies();
    const movie = movies.find(m => m.id === movieId);
    return movie ? movie.comments || [] : [];
  }

  addComment(movieId: number, comment: any): void {
    const movies = this.getAllMovies();
    const movieIndex = movies.findIndex(m => m.id === movieId);
    if (movieIndex > -1) {
      const movie = movies[movieIndex];
      if (!movie.comments) {
        movie.comments = [];
      }
      movie.comments.push(comment);
      movies[movieIndex] = movie;
      localStorage.setItem('movies', JSON.stringify(movies));
    }
  }

  updateMovie(movie: Movie): Observable<void> {
    const movies = this.getAllMovies();

    const index = movies.findIndex(m => m.id === movie.id);
    if (index !== -1) {
      movies[index] = movie;

      localStorage.setItem('movies', JSON.stringify(movies));

    }
    return of(); // Return an empty Observable for completion
  }

  deleteMovie(id: number): void {
    let movies = this.getAllMovies();
    movies = movies.filter((movie) => movie.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(movies));
  }
}
