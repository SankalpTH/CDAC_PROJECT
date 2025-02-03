package com.example.demo.entities;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="mess")
public class Mess {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="mess_id")
private int mId;
@Column(name="mess_name")
private String messName;
@Column(name="mess_address")
private String messAddress;
private String description;
@Column(name="mess_type")
@Enumerated(EnumType.STRING)
private MessType type;
private BigDecimal pricing;
@ManyToOne
@JoinColumn(name="oid")
private Owner owner;
@ManyToOne
@JoinColumn(name="area_id")
private Area area;
@OneToOne

public int getmId() {
	return mId;
}
public void setmId(int mId) {
	this.mId = mId;
}
public String getMessName() {
	return messName;
}
public void setMessName(String messName) {
	this.messName = messName;
}
public String getMessAddress() {
	return messAddress;
}
public void setMessAddress(String messAddress) {
	this.messAddress = messAddress;
}
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}
public MessType getType() {
	return type;
}
public void setType(MessType type) {
	this.type = type;
}
public BigDecimal getPricing() {
	return pricing;
}
public void setPricing(BigDecimal pricing) {
	this.pricing = pricing;
}
public Owner getOwner() {
	return owner;
}
public void setOwner(Owner owner) {
	this.owner = owner;
}
public Area getArea() {
	return area;
}
public void setArea(Area area) {
	this.area = area;
}
public Mess(int mId, String messName, String messAddress, String description, MessType type, BigDecimal pricing,
		Owner owner, Area area) {
	super();
	this.mId = mId;
	this.messName = messName;
	this.messAddress = messAddress;
	this.description = description;
	this.type = type;
	this.pricing = pricing;
	this.owner = owner;
	this.area = area;
}
public Mess() {
	super();
	// TODO Auto-generated constructor stub
}


}
