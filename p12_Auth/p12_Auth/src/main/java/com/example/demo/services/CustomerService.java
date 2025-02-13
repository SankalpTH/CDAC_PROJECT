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

	    public String updateCustomer(int id, DummyUserCustomer updatedCustomer) throws Exception {
	    	Customer existingCustomer=crepo.findById(id).orElse(null);
	    	if(existingCustomer==null) {
	    		throw new Exception("Customer not found");
	    	}
	    	User existingUser=existingCustomer.getUser();
	    	if(existingUser==null) {
	    		throw new Exception("Associated user not found for this cutomer");
	    	}
	    	//Updating User
	    	existingUser.setFname(updatedCustomer.getFname());
	    	existingUser.setLname(updatedCustomer.getLname());
	    	existingUser.setEmail(updatedCustomer.getEmail());
	    	existingUser.setPassword(updatedCustomer.getPassword());
	    	existingUser.setPermanentAddress(updatedCustomer.getPermanent_address());
	    	existingUser.setPhoneNumber(updatedCustomer.getPhone_number());
	    	urepo.save(existingUser);
	    	//Updating customer
	    	existingCustomer.setAdharcard_number(updatedCustomer.getAdharcard_number());
	    	existingCustomer.setDob((updatedCustomer.getDob()));
	    	existingCustomer.setType(updatedCustomer.getType());
	    	existingCustomer.setUser(existingUser);
	    	crepo.save(existingCustomer);
	    	return "Updated succesfully";	       
	    }
   public String updatePassword(int id,String oldPass,String newPass) throws Exception {
	   Customer customer = crepo.findById(id).orElseThrow(() -> new Exception("Customer not found"));
	if(!customer.getUser().getPassword().equals(oldPass)) {
		throw new Exception("Old password is incorrect");
	}
	customer.getUser().setPassword(newPass);
    crepo.save(customer);
	  return "Updated succesfully";
   }
	    public void deleteCustomer(int id) {
	        crepo.deleteById(id);
	    }
}
