package com.example.demo.entities;

public class FilterRequest {
    private String areaName;
    private int cityId;
    private boolean wifi;
    private boolean ac;
    private boolean laundry;

    // Getters and Setters
    public String getAreaName() { return areaName; }
    public void setAreaName(String areaName) { this.areaName = areaName; }

    public int getCityId() { return cityId; }
    public void setCityId(int cityId) { this.cityId = cityId; }

    public boolean isWifi() { return wifi; }
    public void setWifi(boolean wifi) { this.wifi = wifi; }

    public boolean isAc() { return ac; }
    public void setAc(boolean ac) { this.ac = ac; }

    public boolean isLaundry() { return laundry; }
    public void setLaundry(boolean laundry) { this.laundry = laundry; }
}