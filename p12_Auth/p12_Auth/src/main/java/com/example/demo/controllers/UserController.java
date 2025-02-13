package com.example.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.services.UserService;
import com.example.demo.entities.DummyUser;
import com.example.demo.entities.User;


@RestController
@RequestMapping("/auth")
public class UserController {

	@Autowired
	UserService uservice;

	@PostMapping("/checkUser")
	public User checkUser(@RequestBody DummyUser DUser) {
		return uservice.checkUser(DUser.getEmail(), DUser.getPassword());
	}
}
