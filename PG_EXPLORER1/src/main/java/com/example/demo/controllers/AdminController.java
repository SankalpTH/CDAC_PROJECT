package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.entities.Mess;
import com.example.demo.entities.Pg;
import com.example.demo.entities.User;
import com.example.demo.services.UserService;

@Controller
public class AdminController {
    @Autowired
    UserService uservice;
	
	@GetMapping("/getAllUser")
	public List<User> getAllUser() {
		return uservice.getAllUser();
	}
	
	@GetMapping("/getAllPg")
	public List<Pg> getAllPg(){
		return uservice.getAllPg();
	}
	@GetMapping("/GetAllMess")
	public List<Mess> getAllMess(){
		return uservice.getAllMess();
	}
	@PutMapping("/UpdateAdmin/{uid}")
	public User updateAdmin(@PathVariable int uid,@RequestBody User user) {
		return uservice.updateUser(uid, user);
	}
}
