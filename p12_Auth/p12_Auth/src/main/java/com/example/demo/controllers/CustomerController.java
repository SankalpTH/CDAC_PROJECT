package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.DummyUserCustomer;
import com.example.demo.services.CustomerService;
import com.example.demo.services.EmailService;
import com.example.demo.services.UserService;
@RestController

@RequestMapping("/auth")
public class CustomerController {

	@Autowired
	CustomerService cservice;
	@Autowired
	UserService uservice;
	@Autowired
	EmailService emailService;
    @PostMapping("/SaveCustomers")
    public String createCustomer(@RequestBody DummyUserCustomer duc) {
        try {
            // Save the customer details (service layer handling database logic)
            cservice.createCustomer(duc);
            System.out.println("User registered: " + duc);

            // Prepare email content
            String subject = "Registration Successful";
            String body = String.format(
                "Dear %s %s,<br><br>" +
                "Thank you for registering with <b>PG-EXPLORER !</b><br>" +
                "Your account as CUSTOMER has been successfully created.<br><br>" +
                "Best regards,<br><b>PG-EXPLORER</b> Team",
                duc.getFname(),
                duc.getLname()
            );

            // Send email
            emailService.sendEmail(duc.getEmail(), subject, body);

            return "Customer added and email sent successfully.";
        } catch (Exception e) {
            // Log the error and return an appropriate message
            System.err.println("Error in saving customer or sending email: " + e.getMessage());
            return "Failed to add customer or send email. Error: " + e.getMessage();
        }
    }
}