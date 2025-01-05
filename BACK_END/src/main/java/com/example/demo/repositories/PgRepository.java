package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Pg;

@Repository
public interface PgRepository extends JpaRepository<Pg, Integer> {

}
