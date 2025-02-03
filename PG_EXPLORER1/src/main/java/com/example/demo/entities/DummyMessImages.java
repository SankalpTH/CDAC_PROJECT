package com.example.demo.entities;

import java.math.BigDecimal;

import jakarta.persistence.Lob;

public class DummyMessImages {
	@Lob
	private byte[] image1;

	@Lob
	private byte[] image2;
	
	@Lob
	private byte[] image3;
	
	@Lob
	private byte[] image4;
private int pid;
private String messName;
private String messAddress;
private BigDecimal pricing;
private String description;
private MessType type;
public byte[] getImage1() {
	return image1;
}
public void setImage1(byte[] image1) {
	this.image1 = image1;
}
public byte[] getImage2() {
	return image2;
}
public void setImage2(byte[] image2) {
	this.image2 = image2;
}
public byte[] getImage3() {
	return image3;
}
public void setImage3(byte[] image3) {
	this.image3 = image3;
}
public byte[] getImage4() {
	return image4;
}
public void setImage4(byte[] image4) {
	this.image4 = image4;
}
public int getPid() {
	return pid;
}
public void setPid(int pid) {
	this.pid = pid;
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
public BigDecimal getPricing() {
	return pricing;
}
public void setPricing(BigDecimal pricing) {
	this.pricing = pricing;
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
public DummyMessImages(byte[] image1, byte[] image2, byte[] image3, byte[] image4, int pid, String messName,
		String messAddress, BigDecimal pricing, String description, MessType type) {
	super();
	this.image1 = image1;
	this.image2 = image2;
	this.image3 = image3;
	this.image4 = image4;
	this.pid = pid;
	this.messName = messName;
	this.messAddress = messAddress;
	this.pricing = pricing;
	this.description = description;
	this.type = type;
}
public DummyMessImages() {
	super();
	// TODO Auto-generated constructor stub
}

}
