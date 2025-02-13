package com.example.demo.entities;

public class DummyArea {
	private int aid;
	private String areaName;

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public int getAid() {
		return aid;
	}

	public void setAid(int aid) {
		this.aid = aid;
	}


	public DummyArea(int aid, String areaName) {
		super();
		this.aid = aid;
		this.areaName = areaName;
	}

	public DummyArea() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}