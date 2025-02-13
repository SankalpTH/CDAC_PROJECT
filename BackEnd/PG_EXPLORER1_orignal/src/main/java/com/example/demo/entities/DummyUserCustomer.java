package com.example.demo.entities;

import java.sql.Date;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public class DummyUserCustomer {
String fname;
String lname;
String email;
String password;
String phone_number;
int rid;

//customer
String adharcard_number;
java.sql.Date dob;
@Enumerated(EnumType.STRING)
CustomerType type;
String permanent_address;
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
public java.sql.Date getDob() {
	return dob;
}
public void setDob(java.sql.Date dob) {
	this.dob = dob;
}
public CustomerType getType() {
	return type;
}
public void setType(CustomerType type) {
	this.type = type;
}
public String getPermanent_address() {
	return permanent_address;
}
public DummyUserCustomer(String fname, String lname, String email, String password, String phone_number,
		String adharcard_number, Date dob, CustomerType type, String permanent_address) {
	super();
	this.fname = fname;
	this.lname = lname;
	this.email = email;
	this.password = password;
	this.phone_number = phone_number;
	this.adharcard_number = adharcard_number;
	this.dob = dob;
	this.type = type;
	this.permanent_address = permanent_address;
}
public void setPermanent_address(String permanent_address) {
	this.permanent_address = permanent_address;
}

}
