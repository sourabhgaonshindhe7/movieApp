export interface Comment {
    text: string;
    rating: number;
  }

// src/app/models/movie.model.ts
export interface Movie {
    id: number;
    title: string;
    director: string;
    genre: string;
    releaseYear: number;
    comments?: Comment[];
    publishReview: boolean;
    likes : number
  }
  