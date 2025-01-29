package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Pg;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface PgRepository extends JpaRepository<Pg, Integer> {
	@Query("SELECT pg FROM Pg pg JOIN pg.area area " +
		       "WHERE area.areaName = :areaName " +
		       "AND pg.wifi = :wifi " +
		       "AND pg.ac = :ac " +
		       "AND pg.laundry = :laundry " +  // Added a space here before the ORDER BY
		       "ORDER BY pg.pricing ASC")
		List<Pg> findPGsByFilters(@Param("areaName") String areaName,
		                          @Param("wifi") boolean wifi,
		                          @Param("ac") boolean ac,
		                          @Param("laundry") boolean laundry);
}