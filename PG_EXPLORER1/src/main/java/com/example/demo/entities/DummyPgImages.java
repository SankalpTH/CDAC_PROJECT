package com.example.demo.entities;

import java.math.BigDecimal;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Lob;

public class DummyPgImages {
	private MultipartFile image1;
	private MultipartFile image2;
	private MultipartFile image3;
	private MultipartFile image4;
	private int pid;
	private String pgName;
	private String pgAddress;
	private BigDecimal pricing;
	private String description;
	private String gLink;
	private boolean wifi;
	private boolean ac;
	private boolean laundry;
	public MultipartFile getImage1() {
		return image1;
	}
	public void setImage1(MultipartFile image1) {
		this.image1 = image1;
	}
	public MultipartFile getImage2() {
		return image2;
	}
	public void setImage2(MultipartFile image2) {
		this.image2 = image2;
	}
	public MultipartFile getImage3() {
		return image3;
	}
	public void setImage3(MultipartFile image3) {
		this.image3 = image3;
	}
	public MultipartFile getImage4() {
		return image4;
	}
	public void setImage4(MultipartFile image4) {
		this.image4 = image4;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public String getPgName() {
		return pgName;
	}
	public void setPgName(String pgName) {
		this.pgName = pgName;
	}
	public String getPgAddress() {
		return pgAddress;
	}
	public void setPgAddress(String pgAddress) {
		this.pgAddress = pgAddress;
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
	
	public String getgLink() {
		return gLink;
	}
	public void setgLink(String gLink) {
		this.gLink = gLink;
	}
	public boolean isWifi() {
		return wifi;
	}
	public void setWifi(boolean wifi) {
		this.wifi = wifi;
	}
	public boolean isAc() {
		return ac;
	}
	public void setAc(boolean ac) {
		this.ac = ac;
	}
	public boolean isLaundry() {
		return laundry;
	}
	public void setLaundry(boolean laundry) {
		this.laundry = laundry;
	}
	public DummyPgImages() {
		super();
		// TODO Auto-generated constructor stub
	}
	public DummyPgImages(MultipartFile image1, MultipartFile image2, MultipartFile image3, MultipartFile image4,
			int pid, String pgName, String pgAddress, BigDecimal pricing, String description, boolean wifi, boolean ac,
			boolean laundry) {
		super();
		this.image1 = image1;
		this.image2 = image2;
		this.image3 = image3;
		this.image4 = image4;
		this.pid = pid;
		this.pgName = pgName;
		this.pgAddress = pgAddress;
		this.pricing = pricing;
		this.description = description;
		this.wifi = wifi;
		this.ac = ac;
		this.laundry = laundry;
	}
    
	
}