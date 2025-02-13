package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repositories.AreaRepository;
import com.example.demo.entities.DummyArea;
@Service
public class AreaService {

	@Autowired
	AreaRepository arepo;

	public List<DummyArea> getAllAreasByCityId(int cityId) {
	    return arepo.findByCityId(cityId) // Fetch all areas
	            .stream()
	            .map(area -> new DummyArea(area.getaId(), area.getAreaName())) // Include ID
	            .collect(Collectors.toList());
	}
}