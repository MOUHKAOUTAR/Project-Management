package com.example.todo_app.service;

import com.example.todo_app.entity.Task;
import com.example.todo_app.entity.Project;
import com.example.todo_app.repository.ProjectRepository;
import com.example.todo_app.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public TaskService(TaskRepository taskRepository,
                       ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    public Task createTask(Long projectId, Task task, Long userId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        if (!project.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized: you cannot add tasks to this project");
        }

        task.setProject(project);
        return taskRepository.save(task);
    }
    
    public List<Task> getTasksByProject(Long projectId, Long userId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (!project.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized: you cannot access this project");
        }

        return taskRepository.findByProject(project);
    }

    public Task completeTask(Long taskId, Long userId) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        Project project = task.getProject();

        if (!project.getUser().getId().equals(userId)) {
            throw new RuntimeException("You cannot modify this task");
        }

        task.setCompleted(true);
        return taskRepository.save(task);
    }
  
    public void deleteTask(Long taskId, Long userId) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        Project project = task.getProject();
        if (!project.getUser().getId().equals(userId)) {
            throw new RuntimeException("You cannot delete this task");
        }

        taskRepository.delete(task);
    }
}
