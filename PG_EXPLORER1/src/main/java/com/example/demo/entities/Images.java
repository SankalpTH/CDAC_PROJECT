package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="images")
public class Images {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "image_id")
	private int imageId;
	@Column(name="image1")
	private byte[] image1;
	@Column(name="image2")
	private byte[] image2;
	@Column(name="image3")
	private byte[] image3;
	@Column(name="image4")
	private byte[] image4;
	
	@OneToOne
	@JoinColumn(name="pg_pg_id")
	private Pg pg;

	public int getImageId() {
		return imageId;
	}

	public void setImageId(int imageId) {
		this.imageId = imageId;
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

	public Pg getPg() {
		return pg;
	}

	public void setPg(Pg pg) {
		this.pg = pg;
	}

	public Images(int imageId, byte[] image1, byte[] image2, byte[] image3, byte[] image4, Pg pg) {
		super();
		this.imageId = imageId;
		this.image1 = image1;
		this.image2 = image2;
		this.image3 = image3;
		this.image4 = image4;
		this.pg = pg;
	}

	public Images() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
