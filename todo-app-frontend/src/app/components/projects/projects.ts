import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Subject, firstValueFrom } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Project } from '../../models/project.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  newProject = { title: '', description: '' };
  showForm: boolean = false;
  loading: boolean = false;
  error: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    console.log(' ProjectsComponent: ngOnInit appelé');
    
    if (!this.authService.isAuthenticated()) {
      console.log(' Utilisateur non authentifié, redirection vers /login');
      this.router.navigate(['/login']);
      return;
    }

    await this.loadProjects();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async loadProjects() {
    console.log(' loadProjects() appelé');
    this.loading = true;
    this.error = '';

    const token = this.authService.getToken();
    console.log(' Token présent:', !!token);

    if (!token) {
      console.log(' Aucun token trouvé');
      this.error = 'Session expirée. Veuillez vous reconnecter.';
      this.loading = false;
      setTimeout(() => {
        this.authService.logout();
        this.router.navigate(['/login']);
      }, 2000);
      return;
    }

    try {
      const data = await firstValueFrom(this.apiService.getProjects());
      console.log(' Projets reçus:', data);
      this.projects = data;
      this.loading = false;
      this.error = '';
    } catch (err: any) {
      console.error('Erreur API:', err);
      this.loading = false;
      
      if (err?.status === 401) {
        this.error = 'Session expirée. Redirection...';
        setTimeout(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
        }, 1500);
      } else if (err?.status === 0) {
        this.error = 'Impossible de contacter le serveur. Vérifiez votre connexion.';
      } else {
        this.error = `Erreur lors du chargement des projets (${err?.status || 'inconnue'})`;
      }
    }
  }

  async createProject() {
    if (!this.newProject.title.trim()) {
      this.error = 'Le titre est requis';
      return;
    }

    try {
      const project = await firstValueFrom(
        this.apiService.createProject(this.newProject)
      );
      console.log(' Projet créé:', project);
      
      this.projects.push(project);
      this.newProject = { title: '', description: '' };
      this.showForm = false;
      this.error = '';
    
      await this.loadProjects();
    } catch (err: any) {
      this.error = err.error?.error || 'Erreur lors de la création';
      console.error(' Erreur création projet:', err);
    }
  }

  async deleteProject(id: number) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return;
    }

    try {
      await firstValueFrom(this.apiService.deleteProject(id));
      console.log(' Projet supprimé:', id);
      this.projects = this.projects.filter(p => p.id !== id);
      this.error = '';
    } catch (err: any) {
      this.error = 'Erreur lors de la suppression';
      console.error(' Erreur suppression:', err);
    }
  }

  viewTasks(projectId: number) {
    console.log('Navigation vers les tâches du projet:', projectId);
    if (!projectId || isNaN(projectId)) {
      console.error(' ID de projet invalide pour la navigation:', projectId);
      this.error = 'Impossible d\'accéder aux tâches de ce projet';
      return;
    }
    this.router.navigate(['/projects', projectId, 'tasks']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}