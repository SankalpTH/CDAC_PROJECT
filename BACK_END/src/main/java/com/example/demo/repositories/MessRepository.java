package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Mess;

@Repository

public interface MessRepository extends JpaRepository<Mess, Integer> {

}
