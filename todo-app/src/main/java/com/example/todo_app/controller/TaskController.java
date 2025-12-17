package com.example.todo_app.controller;

import com.example.todo_app.entity.Task;
import com.example.todo_app.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    @PostMapping("/{projectId}")
    public Task createTask(@PathVariable Long projectId,
                           @RequestBody Task task,
                           Principal principal){
        Long userId = Long.parseLong(principal.getName());
        return taskService.createTask(projectId, task, userId);
    }

    @GetMapping("/{projectId}")
    public List<Task> getTasksByProject(@PathVariable Long projectId,
                                        Principal principal){
        Long userId = Long.parseLong(principal.getName());
        return taskService.getTasksByProject(projectId, userId);
    }

    @PutMapping("/complete/{taskId}")
    public Task completeTask(@PathVariable Long taskId,
                             Principal principal){
        Long userId = Long.parseLong(principal.getName());
        return taskService.completeTask(taskId, userId);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId,
                           Principal principal){
        Long userId = Long.parseLong(principal.getName());
        taskService.deleteTask(taskId, userId);
    }
}
