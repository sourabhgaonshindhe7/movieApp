import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { MovieService } from 'src/app/service/movie.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-listofmovie',
  templateUrl: './listofmovie.component.html',
  styleUrls: ['./listofmovie.component.css']
})
export class ListofmovieComponent implements OnInit {

  movies: any[] = [];
  pageSize = 10;
  pageIndex = 0;
  totalMovies = 0;
  totalPages: number[] = [];
  selectedMovieId: number | null = null;
  likedMovies: Set<number> = new Set<number>();
  constructor(private movieService: MovieService, private authService: AuthService, private userService : UserService) {}

  ngOnInit(): void {
    this.fetchMovies();
    this.loadLikedMovies(); // Load liked movies from local storage or backend

  }

  fetchMovies(): void {
    this.movieService.getMovies(this.pageIndex * this.pageSize, this.pageSize).subscribe(response => {
      this.movies = response.movies;
      this.totalMovies = response.total;
      this.totalPages = Array(Math.ceil(this.totalMovies / this.pageSize)).fill(0).map((x, i) => i);
    });
  }

  onPageChange(pageIndex: number): void {
    if (pageIndex >= 0 && pageIndex < this.totalPages.length) {
      this.pageIndex = pageIndex;
      this.fetchMovies();
    }
  }

  likeMovie(movieId: number): void {
    if (this.likedMovies.has(movieId)) {
      console.log(`Movie with ID ${movieId} has already been liked.`);
      return;
    }

    console.log("movies", this.movies);
    const movie = this.movies.find(m => m.id === movieId);
    console.log("movie", movie);

    if (movie) {
      movie.likes = (movie.likes || 0) + 1; // Increment the like count

      console.log("Updated movie", movie);
      this.movieService.updateMovie(movie).subscribe(() => {
        console.log(`Movie with ID ${movieId} liked.`);
        this.likedMovies.add(movieId); // Add movie to liked list
        this.saveLikedMovies(); // Save liked movies to local storage or backend
        this.fetchMovies(); // Refresh the list of movies
      }, error => {
        console.error('Error updating movie:', error);
      });
    } else {
      console.log(`Movie with ID ${movieId} not found.`);
    }
  }

  loadLikedMovies(): void {
    const likedMovies = localStorage.getItem('likedMovies');
    if (likedMovies) {
      this.likedMovies = new Set<number>(JSON.parse(likedMovies));
    }
  }

  saveLikedMovies(): void {
    localStorage.setItem('likedMovies', JSON.stringify(Array.from(this.likedMovies)));
  }

  openCommentModal(movieId: number): void {
    this.selectedMovieId = movieId;
  }

  logout(): void {
    this.authService.logout();
  }
}
