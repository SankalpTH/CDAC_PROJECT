package com.example.demo.entities;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public class DummyUserOwner {
	String fname;
	String lname;
	String email;
	String password;
	String phone_number;
	int rid;
	
	//Owner
	String adharcard_number;
	String permanent_address;
	@Enumerated(EnumType.STRING)
	OwnerType type;
	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public String getLname() {
		return lname;
	}
	public void setLname(String lname) {
		this.lname = lname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhone_number() {
		return phone_number;
	}
	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}
	public int getRid() {
		return rid;
	}
	public void setRid(int rid) {
		this.rid = rid;
	}
	public String getAdharcard_number() {
		return adharcard_number;
	}
	public void setAdharcard_number(String adharcard_number) {
		this.adharcard_number = adharcard_number;
	}
	public String getPermanent_address() {
		return permanent_address;
	}
	public void setPermanent_address(String permanent_address) {
		this.permanent_address = permanent_address;
	}
	public OwnerType getType() {
		return type;
	}
	public void setType(OwnerType type) {
		this.type = type;
	}
	public DummyUserOwner(String fname, String lname, String email, String password, String phone_number, int rid,
			String adharcard_number, String permanent_address, OwnerType type) {
		super();
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.password = password;
		this.phone_number = phone_number;
		this.rid = rid;
		this.adharcard_number = adharcard_number;
		this.permanent_address = permanent_address;
		this.type = type;
	}
}
