import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-comment',
  templateUrl: './movie-comment.component.html',
  styleUrls: ['./movie-comment.component.css']
})
export class MovieCommentComponent implements OnInit , OnChanges {
  @Input() movieId!: number;
  commentForm: FormGroup;
  movie: any;
  stars: number[] = [1, 2, 3, 4, 5];
  rating: number = 5;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef

  ) {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
      star: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes',changes);
    if(changes['movieId'] && changes['movieId'].currentValue){
      this.movie = this.movieService.getMovieById(changes['movieId'].currentValue)
    }
  }

  ngOnInit(): void {
    this.movie = this.movieService.getMovieById(this.movieId);
  }

  setRating(rating: number): void {
    this.rating = rating;
    this.commentForm.patchValue({ star: rating });
  }

  addComment(): void {
    if (this.commentForm.valid) {
      const { comment, star } = this.commentForm.value;
      const user = this.authService.getCurrentUser();
      const newComment = { user: user.username, comment, star };
      this.movie.comments = this.movie.comments || [];
      this.movie.comments.push(newComment);
      this.movieService.updateMovie(this.movie);
      this.commentForm.reset({ comment: '', star: 5 });
      this.rating = 5; // Reset rating
      this.cdr.detectChanges(); // Manually trigger change detection

    }
  }
}
