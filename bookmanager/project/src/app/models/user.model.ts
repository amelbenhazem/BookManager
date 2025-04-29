export interface User {
  id: number;
  email: string;
  password: string;
  role: 'admin' | 'reader';
  name: string;
}

export interface BookRequest {
  id: number;
  userId: number;
  bookId: number;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: Date;
}

export interface BookReview {
  id: number;
  userId: number;
  bookId: number;
  rating: number;
  comment: string;
  reviewDate: Date;
}