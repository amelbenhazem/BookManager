import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookRequest } from '../../models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="book-card">
      <div class="book-content">
        <h3 class="book-title">{{ book.title }}</h3>
        <p class="book-author">by {{ book.author }}</p>
        <div class="book-details">
          <span class="book-year">{{ book.year }}</span>
          <span class="book-genre">{{ book.genre }}</span>
        </div>
        <p class="book-description" *ngIf="book.description">{{ book.description }}</p>
        
        <div class="rating-section" *ngIf="!isAdmin && bookRequest && bookRequest.status === 'approved'">
          <div class="stars">
            <span 
              *ngFor="let star of [1,2,3,4,5]" 
              class="star"
              [class.filled]="rating >= star"
              (click)="setRating(star)"
            >
              ★
            </span>
          </div>
          <textarea 
            *ngIf="rating > 0"
            [(ngModel)]="comment" 
            placeholder="Write your review..."
            class="review-input"
          ></textarea>
          <button 
            *ngIf="rating > 0" 
            class="submit-review-button"
            (click)="submitReview()"
          >
            Submit Review
          </button>
        </div>
      </div>
      
      <div class="book-actions">
        <ng-container *ngIf="isAdmin; else readerActions">
          <button class="edit-button" [routerLink]="['/edit', book.id]">Edit</button>
          <button class="delete-button" (click)="onDelete()">Delete</button>
        </ng-container>
        <ng-template #readerActions>
          <div class="request-status" *ngIf="bookRequest; else requestButton">
            <span [class]="'status-badge ' + bookRequest.status">
              {{ bookRequest.status | titlecase }}
            </span>
          </div>
          <ng-template #requestButton>
            <button class="request-button" (click)="onRequestAccess()">
              Request Access
            </button>
          </ng-template>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .book-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      transition: transform 0.2s, box-shadow 0.2s;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .book-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .book-content {
      flex: 1;
    }

    .book-title {
      margin: 0 0 0.5rem;
      color: #333;
      font-size: 1.25rem;
    }

    .book-author {
      color: #555;
      font-style: italic;
      margin: 0 0 1rem;
    }

    .book-details {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .book-year, .book-genre {
      background-color: #f0f4f8;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
    }

    .book-description {
      color: #666;
      font-size: 0.9rem;
      margin: 0.5rem 0 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .rating-section {
      margin: 1rem 0;
    }

    .stars {
      display: flex;
      gap: 0.25rem;
      margin-bottom: 0.5rem;
    }

    .star {
      font-size: 1.5rem;
      cursor: pointer;
      color: #ddd;
      transition: color 0.2s;
    }

    .star:hover,
    .star.filled {
      color: #ffd700;
    }

    .review-input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin: 0.5rem 0;
      min-height: 80px;
      resize: vertical;
    }

    .submit-review-button {
      background-color: #3366CC;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .submit-review-button:hover {
      background-color: #2855B0;
    }

    .book-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .status-badge {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .status-badge.pending {
      background-color: #fff3cd;
      color: #856404;
    }

    .status-badge.approved {
      background-color: #d4edda;
      color: #155724;
    }

    .status-badge.rejected {
      background-color: #f8d7da;
      color: #721c24;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .edit-button {
      background-color: #e7f0fd;
      color: #3366CC;
    }

    .edit-button:hover {
      background-color: #d1e4fc;
    }

    .delete-button {
      background-color: #fdeded;
      color: #dc3545;
    }

    .delete-button:hover {
      background-color: #fcd1d1;
    }

    .request-button {
      background-color: #28a745;
      color: white;
    }

    .request-button:hover {
      background-color: #218838;
    }
  `]
})
export class BookCardComponent {
  @Input() book!: Book;
  @Input() isAdmin = false;
  @Input() bookRequest: BookRequest | null = null;
  @Output() edit = new EventEmitter<Book>();
  @Output() delete = new EventEmitter<number>();
  @Output() requestAccess = new EventEmitter<number>();
  @Output() submitRating = new EventEmitter<{bookId: number, rating: number, comment: string}>();

  rating = 0;
  comment = '';

  onDelete(): void {
    this.delete.emit(this.book.id);
  }

  onRequestAccess(): void {
    this.requestAccess.emit(this.book.id);
  }

  setRating(value: number): void {
    this.rating = value;
  }

  submitReview(): void {
    if (this.rating > 0) {
      this.submitRating.emit({
        bookId: this.book.id,
        rating: this.rating,
        comment: this.comment
      });
      this.rating = 0;
      this.comment = '';
    }
  }
}