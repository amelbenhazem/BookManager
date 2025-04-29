import { Injectable, signal } from '@angular/core';
import { BookRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class BookRequestService {
  private requests = signal<BookRequest[]>([]);

  constructor() {
    this.loadRequests();
  }

  getRequests() {
    return this.requests;
  }

  createRequest(userId: number, bookId: number): void {
    const newRequest: BookRequest = {
      id: this.requests().length + 1,
      userId,
      bookId,
      status: 'pending',
      requestDate: new Date()
    };

    this.requests.update(requests => [...requests, newRequest]);
    this.saveRequests();
  }

  updateRequestStatus(requestId: number, status: 'approved' | 'rejected'): void {
    this.requests.update(requests =>
      requests.map(request =>
        request.id === requestId
          ? { ...request, status }
          : request
      )
    );
    this.saveRequests();
  }

  getUserRequests(userId: number): BookRequest[] {
    return this.requests().filter(request => request.userId === userId);
  }

  private loadRequests(): void {
    const requestsStr = localStorage.getItem('bookRequests');
    if (requestsStr) {
      this.requests.set(JSON.parse(requestsStr));
    }
  }

  private saveRequests(): void {
    localStorage.setItem('bookRequests', JSON.stringify(this.requests()));
  }
}