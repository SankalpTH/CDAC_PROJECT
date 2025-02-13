package com.example.demo.controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entities.DummyUserOwner;
import com.example.demo.services.EmailService;
import com.example.demo.services.OwnerService;
import com.example.demo.services.UserService;

@RestController

@RequestMapping("/auth")
public class OwnerController {

	@Autowired
	OwnerService oservice;
	
	@Autowired
	UserService uservice;
	
	@Autowired
	EmailService emailService;
	
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
}
