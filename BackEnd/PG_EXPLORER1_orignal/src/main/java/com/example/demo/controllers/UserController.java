package com.example.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.services.UserService;
import com.example.demo.entities.DummyUser;
import com.example.demo.entities.User;
@CrossOrigin(origins="http://localhost:3000")
@RestController
public class UserController {

	@Autowired
	UserService uservice;

	@PostMapping("/checkUser")
	public User checkUser(@RequestBody DummyUser DUser) {
		return uservice.checkUser(DUser.getEmail(), DUser.getPassword());
	}
    @PutMapping("/updateUser/{id}")
    public String updateUser(@PathVariable int id, @RequestBody User userDetails) {
         uservice.updateUser(id, userDetails);
        return "Updated succesfully";
    }

    @DeleteMapping("/removeUser/{id}")
    public String deleteUser(@PathVariable int id) {
        uservice.deleteUser(id);
        return "Deleted user succesfully";
    }
}
