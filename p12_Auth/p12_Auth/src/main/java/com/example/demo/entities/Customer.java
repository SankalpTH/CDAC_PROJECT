package com.example.demo.entities;

import java.sql.Date;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="customer")
public class Customer {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cid;
	@Column(name="adharcard_number")
    private String adharcardNumber;
	private java.sql.Date dob;
	@Enumerated(EnumType.STRING)
	private CustomerType type;
    @OneToOne
    @JoinColumn(name = "uid")
    @Cascade(CascadeType.ALL)
    private User user;

	public int getCid() {
		return cid;
	}

	public void setCid(int cid) {
		this.cid = cid;
	}

	
	public String getAdharcard_number() {
		return adharcardNumber;
	}

	public void setAdharcard_number(String adharcard_number) {
		this.adharcardNumber = adharcard_number;
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
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Customer( String adharcardNumber, Date dob, CustomerType type, User user) {
		super();
		this.adharcardNumber = adharcardNumber;
		this.dob = dob;
		this.type = type;
		this.user = user;
	}

	public Customer() {
		super();
		// TODO Auto-generated constructor stub
	}
    
}
