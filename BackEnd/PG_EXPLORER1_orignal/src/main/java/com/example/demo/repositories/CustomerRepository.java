package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Customer;

import jakarta.transaction.Transactional;
@Transactional
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

	  Optional<Customer> findByAdharcardNumber(String adharcard_number);
}
