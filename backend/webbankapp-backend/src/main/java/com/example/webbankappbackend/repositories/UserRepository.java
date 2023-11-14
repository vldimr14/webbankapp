package com.example.webbankappbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.webbankappbackend.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByEmail(String email);
}
