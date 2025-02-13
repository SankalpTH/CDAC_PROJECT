package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="role")
public class Role {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int rid;
private String rname;
public int getRid() {
	return rid;
}
public void setRid(int rid) {
	this.rid = rid;
}
public String getRname() {
	return rname;
}
public Role() {
	super();
	// TODO Auto-generated constructor stub
}
public void setRname(String rname) {
	this.rname = rname;
}
public Role(int rid, String rname) {
	super();
	this.rname = rname;
}
}
