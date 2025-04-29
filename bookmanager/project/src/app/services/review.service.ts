import { Injectable, signal } from '@angular/core';
import { BookReview } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews = signal<BookReview[]>([]);

  constructor() {
    this.loadReviews();
  }

  getReviews() {
    return this.reviews;
  }

  addReview(userId: number, bookId: number, rating: number, comment: string): void {
    const newReview: BookReview = {
      id: this.reviews().length + 1,
      userId,
      bookId,
      rating,
      comment,
      reviewDate: new Date()
    };

    this.reviews.update(reviews => [...reviews, newReview]);
    this.saveReviews();
  }

  getBookReviews(bookId: number): BookReview[] {
    return this.reviews().filter(review => review.bookId === bookId);
  }

  private loadReviews(): void {
    const reviewsStr = localStorage.getItem('bookReviews');
    if (reviewsStr) {
      this.reviews.set(JSON.parse(reviewsStr));
    }
  }

  private saveReviews(): void {
    localStorage.setItem('bookReviews', JSON.stringify(this.reviews()));
  }
}