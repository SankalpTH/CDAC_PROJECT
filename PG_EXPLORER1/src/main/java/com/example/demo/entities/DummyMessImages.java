package com.example.demo.entities;

import java.math.BigDecimal;

import org.springframework.web.multipart.MultipartFile;


public class DummyMessImages {
	private MultipartFile image1;
	private MultipartFile image2;
	private MultipartFile image3;
	private MultipartFile image4;
	private String messName;
	private String messAddress;
	private BigDecimal pricing;
	private String description;
	private String gmLink;
	private int oid;
	private int aid;
	private MessType type;

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

	public String getGmLink() {
		return gmLink;
	}

	public void setGmLink(String gmLink) {
		this.gmLink = gmLink;
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

	
	public int getOid() {
		return oid;
	}

	public void setOid(int oid) {
		this.oid = oid;
	}

	public int getAid() {
		return aid;
	}

	public void setAid(int aid) {
		this.aid = aid;
	}

	public MessType getType() {
		return type;
	}

	public void setType(MessType type) {
		this.type = type;
	}

	

	public DummyMessImages(MultipartFile image1, MultipartFile image2, MultipartFile image3, MultipartFile image4,
			String messName, String messAddress, BigDecimal pricing, String description, String gmLink, int oid,
			int aid, MessType type) {
		super();
		this.image1 = image1;
		this.image2 = image2;
		this.image3 = image3;
		this.image4 = image4;
		this.messName = messName;
		this.messAddress = messAddress;
		this.pricing = pricing;
		this.description = description;
		this.gmLink = gmLink;
		this.oid = oid;
		this.aid = aid;
		this.type = type;
	}

	public DummyMessImages() {
		super();
		// TODO Auto-generated constructor stub
	}

}
