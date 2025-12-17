import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Task, Project } from '../../models/project.model';
import { Subject, firstValueFrom } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css'],
  imports: [CommonModule, FormsModule]
})
export class TasksComponent implements OnInit, OnDestroy {
  projectId!: number;
  project: Project | null = null;
  tasks: Task[] = [];
  newTask = { title: '', description: '', dueDate: '' };
  showForm: boolean = false;
  loading: boolean = false;
  error: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    console.log('TasksComponent: ngOnInit appelé');
    
    if (!this.authService.isAuthenticated()) {
      console.log(' Utilisateur non authentifié, redirection vers /login');
      this.router.navigate(['/login']);
      return;
    }

    this.projectId = +this.route.snapshot.paramMap.get('id')!;
    console.log(' Project ID:', this.projectId);

    if (!this.projectId || isNaN(this.projectId)) {
      this.error = 'ID de projet invalide';
      return;
    }

    await this.loadProject();
    await this.loadTasks();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async loadProject() {
    try {
      const project = await firstValueFrom(this.apiService.getProject(this.projectId));
      console.log('Projet chargé:', project);
      this.project = project;
      this.error = '';
    } catch (err: any) {
      console.error(' Erreur chargement projet:', err);
      if (err?.status === 404) {
        this.error = 'Projet non trouvé';
      } else if (err?.status === 401) {
        this.error = 'Session expirée. Redirection...';
        setTimeout(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
        }, 1500);
      } else {
        this.error = 'Erreur lors du chargement du projet';
      }
    }
  }

  async loadTasks() {
    console.log('loadTasks() appelé');
    this.loading = true;
    this.error = '';

    try {
      const data = await firstValueFrom(this.apiService.getTasks(this.projectId));
      console.log(' Tâches reçues:', data);
      this.tasks = data;
      this.loading = false;
    } catch (err: any) {
      console.error(' Erreur chargement tâches:', err);
      this.loading = false;
      
      if (err?.status === 401) {
        this.error = 'Session expirée. Redirection...';
        setTimeout(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
        }, 1500);
      } else if (err?.status === 0) {
        this.error = 'Impossible de contacter le serveur';
      } else {
        this.error = 'Erreur lors du chargement des tâches';
      }
    }
  }

  async createTask() {
    if (!this.newTask.title.trim()) {
      this.error = 'Le titre est requis';
      return;
    }

    try {
      const task = await firstValueFrom(
        this.apiService.createTask(this.projectId, this.newTask)
      );
      console.log('Tâche créée:', task);
      
      this.tasks.push(task);
      this.newTask = { title: '', description: '', dueDate: '' };
      this.showForm = false;
      this.error = '';
    } catch (err: any) {
      this.error = err.error?.error || 'Erreur lors de la création';
      console.error('Erreur création tâche:', err);
    }
  }

  async toggleComplete(task: Task) {
    if (!task.id) return;

    try {
      const updatedTask = await firstValueFrom(
        this.apiService.completeTask(task.id)
      );
      console.log('Tâche mise à jour:', updatedTask);
      
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
      this.error = '';
    } catch (err: any) {
      this.error = 'Erreur lors de la mise à jour';
      console.error('Erreur toggle complete:', err);
    }
  }

  async deleteTask(id: number) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      return;
    }

    try {
      await firstValueFrom(this.apiService.deleteTask(id));
      console.log('Tâche supprimée:', id);
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.error = '';
    } catch (err: any) {
      this.error = 'Erreur lors de la suppression';
      console.error('Erreur suppression tâche:', err);
    }
  }

  goBack() {
    this.router.navigate(['/projects']);
  }
}
