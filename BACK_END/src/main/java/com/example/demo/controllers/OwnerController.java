package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.DeleteExchange;

import com.example.demo.entities.DummyUserOwner;
import com.example.demo.entities.Owner;
import com.example.demo.services.OwnerService;
import com.example.demo.services.UserService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class OwnerController {

	@Autowired
	OwnerService oservice;
	
	@Autowired
	UserService uservice;
	
	@GetMapping("/getAllOwners")
	 public List<Owner> getAllOwner(){
		return oservice.getAllOwner();
	}
    @GetMapping("/getOneOwner/{id}")
     public Owner getOneOner(@PathVariable int id) {
    	return oservice.getOwnerById(id);
    }
    @PostMapping("/saveOwner")
    public String createOwner(@RequestBody DummyUserOwner duo) throws Exception {
        try {
            oservice.CreateOwner(duo);
            return "Owner created successfully";
        } catch (Exception e) {
            // Catch and return only the error message
            return e.getMessage();
        }
    }
    @PutMapping("/updateCustomer/{id}")
    public String UpdateOwner(@PathVariable int id,@RequestBody Owner owner) {
    	oservice.updateOwner(id, owner);
    	return "updated succesfully";
    }
    @DeleteExchange("removeOwner/{id}")
    public String DeleteOwner(@PathVariable int id) {
    	oservice.deleteOwner(id);
    	return "Deleted Succesfully";
    }
}
