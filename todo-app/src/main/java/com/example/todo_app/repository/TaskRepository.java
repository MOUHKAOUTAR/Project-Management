package com.example.todo_app.repository;

import com.example.todo_app.entity.Task;
import com.example.todo_app.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProject(Project project);
}
