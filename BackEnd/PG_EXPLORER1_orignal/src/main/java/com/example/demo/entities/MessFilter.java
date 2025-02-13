package com.example.demo.entities;

public class MessFilter {
private MessType messType;
private String areaName;
private int cityId;
public MessType getMessType() {
	return messType;
}
public void setMessType(MessType messType) {
	this.messType = messType;
}
public String getAreaName() {
	return areaName;
}
public void setAreaName(String areaName) {
	this.areaName = areaName;
}
public int getCityId() {
	return cityId;
}
public void setCityId(int cityId) {
	this.cityId = cityId;
}
public MessFilter(MessType messType, String areaName, int cityId) {
	super();
	this.messType = messType;
	this.areaName = areaName;
	this.cityId = cityId;
}
public MessFilter() {
	super();
	// TODO Auto-generated constructor stub
}

}