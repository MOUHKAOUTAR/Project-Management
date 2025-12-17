import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { ProjectsComponent } from './components/projects/projects';
import { TasksComponent } from './components/tasks/tasks';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'projects', 
    component: ProjectsComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'projects/:id/tasks', 
    component: TasksComponent, 
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: '/projects' }
];
