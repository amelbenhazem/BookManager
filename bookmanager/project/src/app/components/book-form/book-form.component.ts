import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="form-container">
      <h1>{{ isEditMode ? 'Edit Book' : 'Add New Book' }}</h1>
      
      <form [formGroup]="bookForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="title">Title*</label>
          <input 
            type="text" 
            id="title" 
            formControlName="title"
            [class.invalid]="showErrors('title')"
          >
          <div class="error-message" *ngIf="showErrors('title')">
            <span *ngIf="bookForm.get('title')?.hasError('required')">
              Title is required
            </span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="author">Author*</label>
          <input 
            type="text" 
            id="author" 
            formControlName="author"
            [class.invalid]="showErrors('author')"
          >
          <div class="error-message" *ngIf="showErrors('author')">
            <span *ngIf="bookForm.get('author')?.hasError('required')">
              Author is required
            </span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="year">Year*</label>
          <input 
            type="number" 
            id="year" 
            formControlName="year"
            [class.invalid]="showErrors('year')"
          >
          <div class="error-message" *ngIf="showErrors('year')">
            <span *ngIf="bookForm.get('year')?.hasError('required')">
              Year is required
            </span>
            <span *ngIf="bookForm.get('year')?.hasError('min') || bookForm.get('year')?.hasError('max')">
              Year must be between 1000 and {{ currentYear }}
            </span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="genre">Genre*</label>
          <select 
            id="genre" 
            formControlName="genre"
            [class.invalid]="showErrors('genre')"
          >
            <option value="" disabled>Select a genre</option>
            <option *ngFor="let genre of genres" [value]="genre">{{ genre }}</option>
          </select>
          <div class="error-message" *ngIf="showErrors('genre')">
            <span *ngIf="bookForm.get('genre')?.hasError('required')">
              Genre is required
            </span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="description">Description</label>
          <textarea 
            id="description" 
            formControlName="description" 
            rows="4"
          ></textarea>
        </div>
        
        <div class="form-actions">
          <button type="button" class="cancel-button" routerLink="/">Cancel</button>
          <button 
            type="submit" 
            class="submit-button" 
            [disabled]="bookForm.invalid"
          >
            {{ isEditMode ? 'Update Book' : 'Add Book' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      margin-top: 0;
      color: #333;
      margin-bottom: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #555;
    }

    input, select, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s, box-shadow 0.3s;
    }

    input:focus, select:focus, textarea:focus {
      border-color: #3366CC;
      box-shadow: 0 0 0 3px rgba(51, 102, 204, 0.1);
      outline: none;
    }

    input.invalid, select.invalid {
      border-color: #dc3545;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .cancel-button {
      background-color: #f8f9fa;
      color: #495057;
    }

    .cancel-button:hover {
      background-color: #e9ecef;
    }

    .submit-button {
      background-color: #3366CC;
      color: white;
    }

    .submit-button:hover:not(:disabled) {
      background-color: #2855B0;
    }
  `]
})
export class BookFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);

  bookForm!: FormGroup;
  isEditMode = false;
  bookId?: number;
  currentYear = new Date().getFullYear();
  
  genres = [
    'Fiction', 
    'Non-fiction', 
    'Science Fiction', 
    'Fantasy', 
    'Mystery', 
    'Thriller',
    'Romance', 
    'Horror', 
    'Biography', 
    'History', 
    'Science', 
    'Poetry',
    'Classic',
    'Dystopian',
    'Adventure',
    'Children'
  ];

  ngOnInit(): void {
    this.initForm();
    
    // Check if we're in edit mode (url has an ID parameter)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.bookId = +id;
        this.loadBook(this.bookId);
      }
    });
  }

  initForm(): void {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      year: ['', [
        Validators.required, 
        Validators.min(1000), 
        Validators.max(this.currentYear)
      ]],
      genre: ['', Validators.required],
      description: ['']
    });
  }

  loadBook(id: number): void {
    const book = this.bookService.getBookById(id);
    if (book) {
      this.bookForm.patchValue(book);
    } else {
      // Book not found, redirect to list
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (this.bookForm.invalid) return;

    const formValue = this.bookForm.value;
    
    if (this.isEditMode && this.bookId) {
      // Update existing book
      const updatedBook: Book = {
        ...formValue,
        id: this.bookId
      };
      this.bookService.updateBook(updatedBook);
    } else {
      // Add new book
      this.bookService.addBook(formValue);
    }

    // Navigate back to the book list
    this.router.navigate(['/']);
  }

  showErrors(controlName: string): boolean {
    const control = this.bookForm.get(controlName);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }
}