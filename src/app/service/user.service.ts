import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private likedMovies: Set<number> = new Set<number>();

  constructor() {
    // Load liked movies from local storage if available
    const storedLikes = localStorage.getItem('likedMovies');
    if (storedLikes) {
      this.likedMovies = new Set<number>(JSON.parse(storedLikes));
    }
  }

  hasLikedMovie(movieId: number): boolean {
    return this.likedMovies.has(movieId);
  }

  likeMovie(movieId: number): void {
    this.likedMovies.add(movieId);
    localStorage.setItem('likedMovies', JSON.stringify(Array.from(this.likedMovies)));
  }

  // Optionally, you can add a method to unlike a movie
  unlikeMovie(movieId: number): void {
    this.likedMovies.delete(movieId);
    localStorage.setItem('likedMovies', JSON.stringify(Array.from(this.likedMovies)));
  }
}
