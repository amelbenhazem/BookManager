import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookRequestService } from '../../../services/book-request.service';
import { BookService } from '../../../services/book.service';
import { AuthService } from '../../../services/auth.service';
import { Book } from '../../../models/book.model';
import { User, BookRequest } from '../../../models/user.model';

@Component({
  selector: 'app-request-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h2>Book Access Requests</h2>
      
      <div class="requests-list">
        <div *ngIf="requests().length === 0" class="no-requests">
          No pending requests
        </div>

        <div *ngFor="let request of requests()" class="request-card">
          <div class="request-info">
            <div class="book-details">
              <h3>{{ getBookTitle(request.bookId) }}</h3>
              <p class="requester">Requested by: {{ getUserName(request.userId) }}</p>
              <p class="date">Date: {{ request.requestDate | date:'medium' }}</p>
            </div>
            <div class="status" [class]="request.status">
              {{ request.status }}
            </div>
          </div>
          
          <div class="actions" *ngIf="request.status === 'pending'">
            <button 
              class="approve-btn"
              (click)="updateStatus(request.id, 'approved')"
            >
              Approve
            </button>
            <button 
              class="reject-btn"
              (click)="updateStatus(request.id, 'rejected')"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1000px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    h2 {
      color: #333;
      margin-bottom: 2rem;
    }

    .requests-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .no-requests {
      text-align: center;
      padding: 2rem;
      background-color: #f8f9fa;
      border-radius: 8px;
      color: #666;
    }

    .request-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
    }

    .request-info {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .book-details h3 {
      margin: 0 0 0.5rem;
      color: #333;
    }

    .requester, .date {
      color: #666;
      margin: 0.25rem 0;
      font-size: 0.9rem;
    }

    .status {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .status.pending {
      background-color: #fff3cd;
      color: #856404;
    }

    .status.approved {
      background-color: #d4edda;
      color: #155724;
    }

    .status.rejected {
      background-color: #f8d7da;
      color: #721c24;
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 1rem;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .approve-btn {
      background-color: #28a745;
      color: white;
    }

    .approve-btn:hover {
      background-color: #218838;
    }

    .reject-btn {
      background-color: #dc3545;
      color: white;
    }

    .reject-btn:hover {
      background-color: #c82333;
    }
  `]
})
export class RequestDashboardComponent {
  private bookRequestService = inject(BookRequestService);
  private bookService = inject(BookService);
  private authService = inject(AuthService);

  requests = this.bookRequestService.getRequests();

  getBookTitle(bookId: number): string {
    const book = this.bookService.getBookById(bookId);
    return book?.title || 'Unknown Book';
  }

  getUserName(userId: number): string {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.id === userId);
    return user?.name || 'Unknown User';
  }

  updateStatus(requestId: number, status: 'approved' | 'rejected'): void {
    if (confirm(`Are you sure you want to ${status} this request?`)) {
      this.bookRequestService.updateRequestStatus(requestId, status);
    }
  }
}