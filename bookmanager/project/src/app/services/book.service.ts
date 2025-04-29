import { Injectable, signal } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // Using signals for reactive state management
  private books = signal<Book[]>([
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, genre: 'Classic', description: 'A novel about racial inequality in the American South' },
    { id: 2, title: '1984', author: 'George Orwell', year: 1949, genre: 'Dystopian', description: 'A dystopian social science fiction novel' },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, genre: 'Classic', description: 'A novel that examines the American Dream' }
  ]);

  constructor() {
    // Load books from local storage on initialization
    this.loadBooks();
  }

  // Get all books
  getBooks() {
    return this.books;
  }

  // Get a single book by ID
  getBookById(id: number): Book | undefined {
    return this.books().find(book => book.id === id);
  }

  // Add a new book
  addBook(book: Omit<Book, 'id'>): void {
    // Generate a new ID (simple implementation)
    const newId = this.books().length > 0 
      ? Math.max(...this.books().map(b => b.id)) + 1 
      : 1;

    // Add the new book with the generated ID
    this.books.update(books => [...books, { ...book, id: newId }]);
    this.saveBooks();
  }

  // Update an existing book
  updateBook(updatedBook: Book): void {
    this.books.update(books => 
      books.map(book => book.id === updatedBook.id ? updatedBook : book)
    );
    this.saveBooks();
  }

  // Delete a book
  deleteBook(id: number): void {
    this.books.update(books => books.filter(book => book.id !== id));
    this.saveBooks();
  }

  // Search books by title or author
  searchBooks(query: string): Book[] {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return this.books();
    
    return this.books().filter(book => 
      book.title.toLowerCase().includes(searchTerm) || 
      book.author.toLowerCase().includes(searchTerm)
    );
  }

  // Save books to local storage
  private saveBooks(): void {
    localStorage.setItem('books', JSON.stringify(this.books()));
  }

  // Load books from local storage
  private loadBooks(): void {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      this.books.set(JSON.parse(storedBooks));
    }
  }
}