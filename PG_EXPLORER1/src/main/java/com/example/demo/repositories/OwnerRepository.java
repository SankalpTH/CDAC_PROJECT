package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Owner;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface OwnerRepository extends JpaRepository<Owner, Integer>{
	 Optional<Owner> findByAdharcardNumber(String adharcard_number);
}
