package com.example.demo.controllers;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Pg;
import com.example.demo.services.PgService;

@RestController
public class PgController {

	@Autowired
	PgService pservice;
	
	@PostMapping("/addPg/{oid}")
	public Pg savePg(@RequestBody Pg pg , @PathVariable int oid) throws Exception{
		return pservice.addPg(pg, oid);
	}
	@GetMapping("/getPg/{pid}")
	public Optional<Pg> getPg(@PathVariable int pid) {
		return pservice.getPg(pid);
	}
}
