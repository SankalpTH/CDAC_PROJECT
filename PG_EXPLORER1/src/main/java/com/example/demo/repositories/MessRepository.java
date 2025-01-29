package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Mess;
import com.example.demo.entities.MessType;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface MessRepository extends JpaRepository<Mess, Integer> {
	@Query("SELECT m FROM Mess m JOIN m.area a WHERE m.type = :type AND a.areaName = :areaName ORDER BY m.pricing ASC")
	List<Mess> FindMESSByFilter(@Param("type") MessType type, @Param("areaName") String areaName);


}
