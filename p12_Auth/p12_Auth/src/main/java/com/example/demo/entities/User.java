package com.example.demo.entities;


import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="user")
@JsonPropertyOrder({ "uid", "fname", "lname", "email", "password", "phone_number", "role" })
public class User {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uid;
    private String fname;
    private String lname;
    private String email;
    private String password;
    @Column(name="permanent_address")
    private String  permanentAddress;
    @Column(name="phone_number")
    private String phoneNumber;
   
    @ManyToOne
    @JoinColumn(name = "rid")
    @Cascade(CascadeType.ALL)
    private Role role;
    @JsonIgnoreProperties("user")
    @OneToOne(mappedBy = "user", fetch = FetchType.EAGER)
   // @JsonIgnore
    private Owner owner;

	public Owner getOwner() {
		return owner;
	}
	public void setOwner(Owner owner) {
		this.owner = owner;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

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
	

	public String getPermanentAddress() {
		return permanentAddress;
	}

	public void setPermanentAddress(String permanentAddress) {
		this.permanentAddress = permanentAddress;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phone_number) {
		this.phoneNumber = phone_number;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
	


	public User(int uid, String fname, String lname, String email, String password, String permanentAddress,
			String phoneNumber, Role role, Owner owner) {
		super();
		this.uid = uid;
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.password = password;
		this.permanentAddress = permanentAddress;
		this.phoneNumber = phoneNumber;
		this.role = role;
		this.owner = owner;
	}

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
    
}