package com.example.demo.entities;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;

@Entity
@Table(name="owner")
public class Owner {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int oid;
@Column(name="adharcard_number")
private String adharcardNumber;

@Enumerated(EnumType.STRING)
private OwnerType type;

@JsonIgnoreProperties("owner")
@OneToOne    
@JoinColumn(name = "uid")
@Cascade(CascadeType.ALL)
private User user;

public int getOid() {
	return oid;
}

public void setOid(int oid) {
	this.oid = oid;
}

public String getAdharcard_number() {
	return adharcardNumber;
}

public void setAdharcard_number(String adharcard_number) {
	this.adharcardNumber = adharcard_number;
}

public OwnerType getType() {
	return type;
}

public void setType(OwnerType type) {
	this.type = type;
}

public User getUser() {
	return user;
}

public void setUser(User user) {
	this.user = user;
}

public Owner(String adharcard_number, OwnerType type, User user) {
	super();
	this.adharcardNumber = adharcard_number;
	this.type = type;
	this.user = user;
}

public Owner() {
	super();
	// TODO Auto-generated constructor stub
}

}
