package com.example.demo.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Pg;
import com.example.demo.repositories.PgRepository;
import com.example.demo.services.PgService;
@CrossOrigin(origins="http://localhost:3000")
@RestController
public class PgController {

	@Autowired
	PgService pservice;
	@Autowired
	PgRepository prepo;
	
	@PostMapping("/addPg/{oid}")
	public Pg savePg(@RequestBody Pg pg , @PathVariable int oid) throws Exception{
		return pservice.addPg(pg, oid);
	}
	@GetMapping("/getPg/{aname}/{wifi}/{ac}/{laundry}")
	public List<Pg> getPg( @PathVariable String aname,
	        @PathVariable boolean wifi,
	        @PathVariable boolean ac,
	        @PathVariable boolean laundry) {
		return pservice.getPg(aname, wifi, ac, laundry);
	}
	@GetMapping("/getall")
	public List<Pg> getPg() {
		return prepo.findAll();
	}
}
