package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="imimages")
public class MessImages {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="mimageId")
	private int mimageId;
	@Column(name="image1")
	private byte[] image1;
	@Column(name="image2")
	private byte[] image2;
	@Column(name="image3")
	private byte[] image3;
	@Column(name="image4")
	private byte[] image4;
	public int getMimageId() {
		return mimageId;
	}
	public void setMimageId(int mimageId) {
		this.mimageId = mimageId;
	}
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
	public MessImages(int mimageId, byte[] image1, byte[] image2, byte[] image3, byte[] image4) {
		super();
		this.mimageId = mimageId;
		this.image1 = image1;
		this.image2 = image2;
		this.image3 = image3;
		this.image4 = image4;
	}
	public MessImages() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
