import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { BookRequestService } from '../../services/book-request.service';
import { ReviewService } from '../../services/review.service';
import { Book } from '../../models/book.model';
import { BookRequest } from '../../models/user.model';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { BookCardComponent } from '../book-card/book-card.component';
import { ConfirmationDialogComponent } from '../dialogBox/dialogBox.component';


@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SearchBarComponent, BookCardComponent, ConfirmationDialogComponent],
  template: `
    <div class="book-list-container">
      <div class="header">
        <h1>Book Manager</h1>
        <div class="header-actions">
          <button *ngIf="isAdmin()" class="manage-button" routerLink="/admin/requests">
            Manage Requests
          </button>
          <button *ngIf="isAdmin()" class="add-button" routerLink="/add">
            Add New Book
          </button>
          <button class="logout-button" (click)="logout()">
            Logout
          </button>
        </div>
      </div>

      <app-search-bar (searchChange)="onSearch($event)"></app-search-bar>

      <div *ngIf="filteredBooks().length === 0" class="no-books">
        <p>No books found. Add a new book or try a different search.</p>
      </div>

      <div class="books-grid">
        <app-book-card 
          *ngFor="let book of filteredBooks()" 
          [book]="book"
          [isAdmin]="isAdmin()"
          [bookRequest]="getBookRequest(book.id)"
          (edit)="onEditBook($event)"
          (delete)="onDeleteBook($event)"
          (requestAccess)="onRequestAccess($event)"
          (submitRating)="onSubmitRating($event)">
        </app-book-card>
      </div>
    </div>
  `,
  styles: [`
    .book-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .header-actions {
      display: flex;
      gap: 1rem;
    }

    h1 {
      color: #333;
      margin: 0;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .add-button {
      background-color: #3366CC;
      color: white;
    }

    .add-button:hover {
      background-color: #2855B0;
    }

    .manage-button {
      background-color: #28a745;
      color: white;
    }

    .manage-button:hover {
      background-color: #218838;
    }

    .logout-button {
      background-color: #dc3545;
      color: white;
    }

    .logout-button:hover {
      background-color: #c82333;
    }

    .books-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .no-books {
      text-align: center;
      margin-top: 2rem;
      padding: 2rem;
      background-color: #f8f9fa;
      border-radius: 8px;
    }

    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .header-actions {
        width: 100%;
        flex-wrap: wrap;
      }

      .books-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class BookListComponent {
  private bookService = inject(BookService);
  private authService = inject(AuthService);
  private bookRequestService = inject(BookRequestService);
  private reviewService = inject(ReviewService);
  private dialog = inject(MatDialog);

  books = this.bookService.getBooks();
  filteredBooks = signal<Book[]>(this.books());
  
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  onSearch(query: string): void {
    if (!query.trim()) {
      this.filteredBooks.set(this.books());
    } else {
      this.filteredBooks.set(this.bookService.searchBooks(query));
    }
  }

  onEditBook(book: Book): void {
  }

  onDeleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id);
      this.filteredBooks.set(this.bookService.searchBooks(''));
    }
  }

  onRequestAccess(bookId: number): void {
    const user = this.authService.getUser();
    if (user()) {
      this.bookRequestService.createRequest(user()!.id, bookId);
      
      this.dialog.open(ConfirmationDialogComponent, {
        width: '450px',
        data: {
          title: 'Success',
          message: 'Access request submitted successfully!',
          confirmText: 'Close'
        }
      });
    }
  }

  onSubmitRating(event: {bookId: number, rating: number, comment: string}): void {
    const user = this.authService.getUser();
    if (user()) {
      this.reviewService.addReview(
        user()!.id,
        event.bookId,
        event.rating,
        event.comment
      );
      this.dialog.open(ConfirmationDialogComponent, {
        width: '450px',
        data: {
          title: 'Success',
          message: 'Review submitted successfully!!',
          confirmText: 'Close'
        }
      });
    }
  }

  getBookRequest(bookId: number): BookRequest | null {
    const user = this.authService.getUser();
    if (!user()) return null;
    
    const userRequests = this.bookRequestService.getUserRequests(user()!.id);
    return userRequests.find(request => request.bookId === bookId) || null;
  }

  logout(): void {
    this.authService.logout();
  }
}