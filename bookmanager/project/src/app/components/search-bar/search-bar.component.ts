import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <input 
        type="text" 
        class="search-input" 
        placeholder="Search books by title or author..." 
        [(ngModel)]="searchQuery"
        (input)="onSearch()"
      />
      <span class="search-icon">🔍</span>
      <button 
        *ngIf="searchQuery" 
        class="clear-button" 
        (click)="clearSearch()"
      >
        ✕
      </button>
    </div>
  `,
  styles: [`
    .search-container {
      position: relative;
      width: 100%;
      margin-bottom: 1.5rem;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 2.5rem 0.75rem 1rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s, box-shadow 0.3s;
    }

    .search-input:focus {
      border-color: #3366CC;
      box-shadow: 0 0 0 3px rgba(51, 102, 204, 0.1);
      outline: none;
    }

    .search-icon {
      position: absolute;
      right: 2.5rem;
      top: 50%;
      transform: translateY(-50%);
      color: #aaa;
      pointer-events: none;
    }

    .clear-button {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #999;
      cursor: pointer;
      font-size: 1rem;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
    }

    .clear-button:hover {
      background-color: #f0f0f0;
      color: #666;
    }
  `]
})
export class SearchBarComponent {
  @Output() searchChange = new EventEmitter<string>();
  searchQuery = '';

  onSearch(): void {
    this.searchChange.emit(this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchChange.emit('');
  }
}