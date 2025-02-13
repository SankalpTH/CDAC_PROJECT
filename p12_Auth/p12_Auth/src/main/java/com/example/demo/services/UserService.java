package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;
@Service
public class UserService {

	@Autowired
	UserRepository urepo;
	public List<User> getAllUser(){
		return urepo.findAll();
	}
	public User checkUser(String email,String password) {
		User u;
	    Optional<User> ou = urepo.getUser(email, password);
	    try {
	        u = ou.get();  
	        if (u.getOwner() != null) {
	            System.out.println("Owner details: " + u.getOwner().getType());
	        } else {
	            System.out.println("No owner found for this user.");
	        }
	    } catch (Exception e) {
	        u = null;
	    }
	    return u;
	}
}
