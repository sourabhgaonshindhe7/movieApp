import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../service/movie.service'; // Adjust the import path accordingly
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
})
export class MovielistComponent implements OnInit {
  movies: any[] = [];
  filter = {
    title: '',
    castMember: '',
    genre: '',
    releaseYear: null
  };
  sortColumn: string = '';
  sortDirection: string = 'asc';

  constructor(private movieService: MovieService, private authService : AuthService) {}

  ngOnInit() {
    this.movies = this.movieService.getAllMovies();

  }

  get filteredAndSortedMovies() {
    return this.movies
      .filter(movie => 
        (this.filter.title ? movie.title.toLowerCase().includes(this.filter.title.toLowerCase()) : true) &&
        (this.filter.castMember ? movie.castMember.toLowerCase().includes(this.filter.castMember.toLowerCase()) : true) &&
        (this.filter.genre ? movie.genre.toLowerCase().includes(this.filter.genre.toLowerCase()) : true) &&
        (this.filter.releaseYear ? movie.releaseYear === this.filter.releaseYear : true)
      )
      .sort((a, b) => {
        if (!this.sortColumn) return 0;
        const direction = this.sortDirection === 'asc' ? 1 : -1;
        if (a[this.sortColumn] < b[this.sortColumn]) return -1 * direction;
        if (a[this.sortColumn] > b[this.sortColumn]) return 1 * direction;
        return 0;
      });
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  logout(): void {
    this.authService.logout();
  }

  deleteMovie(movieId: number) {
    this.movieService.deleteMovie(movieId);
    this.movies = this.movieService.getAllMovies();  }
}
