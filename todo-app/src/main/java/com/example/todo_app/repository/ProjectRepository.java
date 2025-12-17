package com.example.todo_app.repository;

import com.example.todo_app.entity.Project;
import com.example.todo_app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUser(User user);
}
