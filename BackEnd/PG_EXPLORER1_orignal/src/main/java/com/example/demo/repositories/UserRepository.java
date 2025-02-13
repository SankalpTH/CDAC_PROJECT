package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.User;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Integer>{

	@Query("SELECT u FROM User u WHERE u.email = :email AND u.password = :password")
	public Optional<User> getUser(String email,String password);

    Optional<User> findByPhoneNumber(String phoneNumber);

    Optional<User> findByEmail(String email);
}