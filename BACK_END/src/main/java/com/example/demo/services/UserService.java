package com.example.demo.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;
@Service
public class UserService {

	@Autowired
	UserRepository urepo;
	
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
	    public User updateUser(int id, User userDetails) {
	        User existingUser = urepo.findById(id).orElse(null);
	        if (existingUser != null) {
	            existingUser.setFname(userDetails.getFname());
	            existingUser.setLname(userDetails.getLname());
	            existingUser.setEmail(userDetails.getEmail());
	            existingUser.setPassword(userDetails.getPassword());
	            existingUser.setPhoneNumber(userDetails.getPhoneNumber());
	            existingUser.setRole(userDetails.getRole());
	            return urepo.save(existingUser);
	        }
	        return null;
	    }

	    public void deleteUser(int id) {
	        urepo.deleteById(id);
	    }
}
