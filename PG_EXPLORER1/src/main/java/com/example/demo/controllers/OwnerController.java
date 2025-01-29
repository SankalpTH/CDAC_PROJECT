package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.example.demo.entities.PasswordUpdateRequest;
import com.example.demo.services.EmailService;
import com.example.demo.services.OwnerService;
import com.example.demo.services.UserService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class OwnerController {

	@Autowired
	OwnerService oservice;
	
	@Autowired
	UserService uservice;
	
	@Autowired
	EmailService emailService;
	
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
             // Save the customer details (service layer handling database logic)
             oservice.CreateOwner(duo);
             System.out.println("User registered: " + duo);

             // Prepare email content
             String subject = "Registration Successful";
             String body = String.format(
                 "Dear %s %s,<br><br>" +
                 "Thank you for registering with <b>PG-EXPLORER !</b><br>" +
                 "Your account as OWNER has been successfully created.<br><br>" +
                 "Best regards,<br><b>PG-EXPLORER</b> Team",
                 duo.getFname(),
                 duo.getLname()
             );

             // Send email
             emailService.sendEmail(duo.getEmail(), subject, body);

             return "Owner added and email sent successfully.";
         } catch (Exception e) {
             // Log the error and return an appropriate message
             System.err.println("Error in saving customer or sending email: " + e.getMessage());
             return "Failed to add customer or send email. Error: " + e.getMessage();
         }
    }
    @PutMapping("/updateCustomer/{id}")
    public String UpdateOwner(@PathVariable int id,@RequestBody DummyUserOwner ownerDetails) throws Exception {
    	oservice.updateOwner(id, ownerDetails);
    	return "updated succesfully";
    }
    @PutMapping("/updateCPassword/{id}")
    public ResponseEntity<String> updatePassword(@PathVariable int id, @RequestBody PasswordUpdateRequest request) {
        try {
        	 oservice.updatePassword(id, request.getOldPassword(), request.getNewPassword());      
        	 return ResponseEntity.ok("Password updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @DeleteExchange("removeOwner/{id}")
    public String DeleteOwner(@PathVariable int id) {
    	oservice.deleteOwner(id);
    	return "Deleted Succesfully";
    }
}
