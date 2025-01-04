package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entities.Customer;
import com.example.demo.entities.DummyUserCustomer;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.repositories.CustomerRepository;
import com.example.demo.repositories.RoleRepository;
import com.example.demo.repositories.UserRepository;
@Service
public class CustomerService {

	@Autowired
	CustomerRepository crepo;
	@Autowired
	RoleRepository rrepo;
	@Autowired
	UserRepository urepo;
	 public List<Customer> getAllCustomers() {
	        return crepo.findAll();
	    }

	    public Customer getCustomerById(int id) {
	        return crepo.findById(id).orElse(null);
	    }

	    public Customer createCustomer(DummyUserCustomer duc) throws Exception {
	    	 // Check for duplicate phone number or email
	        Optional<User> existingUserByPhone = urepo.findByPhoneNumber(duc.getPhone_number());
	        Optional<User> existingUserByEmail = urepo.findByEmail(duc.getEmail());

	        if (existingUserByPhone.isPresent()) {
	            throw new Exception("Phone number already exists");
	        }

	        if (existingUserByEmail.isPresent()) {
	            throw new Exception("Email already exists");
	        }
	        Optional<Customer> existingCustomerByAdhar = crepo.findByAdharcardNumber(duc.getAdharcard_number());
	        if (existingCustomerByAdhar.isPresent()) {
	            throw new Exception("Adharcard number already exists");
	        }
	    	Role r=rrepo.findById(duc.getRid()).get();
	    	Customer c=new Customer();
	    	User u=new User();
	    	u.setFname(duc.getFname());
	    	u.setLname(duc.getLname());
	    	u.setEmail(duc.getEmail());
	    	u.setPassword(duc.getPassword());
	    	u.setPhoneNumber(duc.getPhone_number());
	    	u.setRole(r);
	    	u.setPermanentAddress(duc.getPermanent_address());
	    	urepo.save(u);
	    	c.setAdharcard_number(duc.getAdharcard_number());
	    	c.setDob(duc.getDob());
	    	c.setType(duc.getType());
	    	c.setUser(u);
	        return crepo.save(c);
	    }

	    public String updateCustomer(int id, Customer updatedCustomer) {
	    	Customer exestiCustomer=crepo.findById(id).orElse(null);
	    	if(exestiCustomer!=null) {
	    		exestiCustomer.setAdharcard_number(updatedCustomer.getAdharcard_number());
	    		exestiCustomer.setDob(updatedCustomer.getDob());
	    		exestiCustomer.setType(updatedCustomer.getType());
	    		exestiCustomer.setUser(updatedCustomer.getUser());
	    		 crepo.save(exestiCustomer);
	    	}
			return "Updated succesfully";	       
	    }

	    public void deleteCustomer(int id) {
	        crepo.deleteById(id);
	    }
}
