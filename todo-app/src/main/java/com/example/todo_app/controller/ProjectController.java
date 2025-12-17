package com.example.todo_app.controller;

import com.example.todo_app.entity.Project;
import com.example.todo_app.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService){
        this.projectService = projectService;
    }

    @PostMapping
    public Project createProject(@RequestBody Project project, Principal principal){
        Long userId = Long.parseLong(principal.getName());
        return projectService.createProject(userId, project);
    }

    @GetMapping
    public List<Project> getUserProjects(Principal principal){
        Long userId = Long.parseLong(principal.getName());
        return projectService.getUserProjects(userId);
    }

    @GetMapping("/{projectId}")
    public Project getProjectById(@PathVariable Long projectId, Principal principal){
        Long userId = Long.parseLong(principal.getName());
        return projectService.getProjectById(projectId, userId);
    }

    @DeleteMapping("/{projectId}")
    public void deleteProject(@PathVariable Long projectId, Principal principal){
        Long userId = Long.parseLong(principal.getName());
        projectService.deleteProject(projectId, userId);
    }

    @GetMapping("/{projectId}/progress")
    public double getProgress(@PathVariable Long projectId, Principal principal){
        Long userId = Long.parseLong(principal.getName());
        return projectService.calculateProgress(projectId, userId);
    }
}
