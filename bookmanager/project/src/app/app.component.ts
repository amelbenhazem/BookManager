import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendrierComponent } from './components/calendrier/calendrier.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendrierComponent], // Importer RouterOutlet et CalendrierComponent
  template: `
    <div class="app-container">
      <router-outlet></router-outlet> <!-- Pour la navigation -->
      <app-calendrier></app-calendrier> <!-- Afficher le calendrier -->
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      padding: 2rem 1rem;
    }
  `]
})
export class AppComponent {
  title = 'BookManager';
}
