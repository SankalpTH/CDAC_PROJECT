package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.MessImages;

@Repository
public interface MessImagesRepository extends JpaRepository<MessImages, Integer> {

}