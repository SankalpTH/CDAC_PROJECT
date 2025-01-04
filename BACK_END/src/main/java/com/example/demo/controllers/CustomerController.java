package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entities.Customer;
import com.example.demo.entities.DummyUserCustomer;
import com.example.demo.services.CustomerService;
import com.example.demo.services.UserService;
@RestController
@CrossOrigin(origins="http://localhost:3000")
public class CustomerController {

	@Autowired
	CustomerService cservice;
	@Autowired
	UserService uservice;
		@GetMapping("/getAllCustomers")
    public List<Customer> getAllCustomers() {
        return cservice.getAllCustomers();
    }

    @GetMapping("/getOneCustomers/{id}")
    public Customer getCustomerById(@PathVariable int id) {
        Customer customer = cservice.getCustomerById(id);
        return customer;
    }

    @PostMapping("/SaveCustomers")
    public String createCustomer(@RequestBody DummyUserCustomer duc ) throws Exception{
    	try {
    	cservice.createCustomer(duc);
        return "Customer Added Succesfully";
    	}catch (Exception e) {
			return e.getMessage();
		}
    }

    @PutMapping("/UpdateCustomers/{id}")
    public String updateCustomer(@PathVariable int id, @RequestBody Customer customerDetails) {
       cservice.updateCustomer(id, customerDetails);
        return "Updated Succesfully";
    }

    @DeleteMapping("/DeleteCustomers/{id}")
    public String deleteCustomer(@PathVariable int id) {
        cservice.deleteCustomer(id);
        return "Customer deleted successfully";
    }
    
}