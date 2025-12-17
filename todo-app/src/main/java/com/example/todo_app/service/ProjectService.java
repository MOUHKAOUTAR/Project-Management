package com.example.todo_app.service;

import com.example.todo_app.entity.Project;
import com.example.todo_app.entity.Task;
import com.example.todo_app.entity.User;
import com.example.todo_app.repository.ProjectRepository;
import com.example.todo_app.repository.TaskRepository;
import com.example.todo_app.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository,
                          TaskRepository taskRepository,
                          UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public Project createProject(Long userId, Project project) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        project.setUser(user);   
        return projectRepository.save(project);
    }

    public List<Project> getUserProjects(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return projectRepository.findByUser(user);
    }

    public Project getProjectById(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        if (!project.getUser().getId().equals(userId)) {
            throw new RuntimeException("You do not have access to this project");
        }

        return project;
    }

    public void deleteProject(Long projectId, Long userId) {
        Project project = getProjectById(projectId, userId);
        projectRepository.delete(project);
    }
   
    public double calculateProgress(Long projectId, Long userId) {
        Project project = getProjectById(projectId, userId);

        List<Task> tasks = taskRepository.findByProject(project);

        if (tasks.isEmpty()) {
            return 0.0;
        }

        long completed = tasks.stream().filter(Task::isCompleted).count();
        return (completed * 100.0) / tasks.size();
    }
}
