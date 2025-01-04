package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.DummyUserOwner;
import com.example.demo.entities.Owner;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.repositories.OwnerRepository;
import com.example.demo.repositories.RoleRepository;
import com.example.demo.repositories.UserRepository;

@Service
public class OwnerService {

	@Autowired
	OwnerRepository orepo;
	@Autowired
	UserRepository urepo;
	@Autowired
	RoleRepository rrepo;
	
	public List<Owner> getAllOwner(){
		return orepo.findAll();
	}
	public Owner getOwnerById(int id) {
		return orepo.findById(id).orElse(null);
	}
	public Owner CreateOwner(DummyUserOwner duo) throws Exception {
		Optional<User> existingUserByPhone = urepo.findByPhoneNumber(duo.getPhone_number());
        Optional<User> existingUserByEmail = urepo.findByEmail(duo.getEmail());
        Optional<Owner> existingOwnerByAadhar = orepo.findByAdharcardNumber(duo.getAdharcard_number());

        if (existingUserByPhone.isPresent()) {
           System.out.println("Phone number already exists");
        }

        if (existingUserByEmail.isPresent()) {
           System.out.println("Email already exists");
        }

        if (existingOwnerByAadhar.isPresent()) {
        	System.out.println("Aadhaar number already exists");
        }
		Role r=rrepo.findById(duo.getRid()).get();
		Owner o=new Owner();
		User u=new User();
		u.setFname(duo.getFname());
		u.setLname(duo.getLname());
		u.setEmail(duo.getEmail());
		u.setPassword(duo.getPassword());
		u.setPhoneNumber(duo.getPhone_number());
		u.setRole(r);
		u.setPermanentAddress(duo.getPermanent_address());
		
		o.setAdharcard_number(duo.getAdharcard_number());
		o.setType(duo.getType());
		o.setUser(u);
		
		return orepo.save(o);
	}
	public void updateOwner(int id,Owner updateOwner)
	{
		Owner existingOwner=orepo.findById(id).orElse(null);
		if(existingOwner!=null) {
			existingOwner.setAdharcard_number(updateOwner.getAdharcard_number());
			existingOwner.setType(updateOwner.getType());
			existingOwner.setUser(updateOwner.getUser());
			orepo.save(existingOwner);
		}
	}
	public void deleteOwner(int id) {
		orepo.deleteById(id);
	}
}
