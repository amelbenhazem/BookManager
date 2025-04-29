import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RequestDashboardComponent } from './components/admin/request-dashboard/request-dashboard.component';
import { authGuard, adminGuard } from './guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    component: BookListComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'add', 
    component: BookFormComponent,
    canActivate: [authGuard, adminGuard]
  },
  { 
    path: 'edit/:id', 
    component: BookFormComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/requests',
    component: RequestDashboardComponent,
    canActivate: [authGuard, adminGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];