package com.example.demo.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="area")
public class Area {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="area_id")
    private int aId;
	@Column(name="area_name")
	private String areaName;
	@Column(name="city_id")
	private int cityId;
	@OneToMany(mappedBy = "area", fetch = FetchType.EAGER)
	private List<Pg> pg;
	public int getaId() {
		return aId;
	}
	public void setaId(int aId) {
		this.aId = aId;
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
	public List<Pg> getPg() {
		return pg;
	}
	public void setPg(List<Pg> pg) {
		this.pg = pg;
	}
	public Area() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Area(int aId, String areaName, int cityId, List<Pg> pg) {
		super();
		this.aId = aId;
		this.areaName = areaName;
		this.cityId = cityId;
		this.pg = pg;
	}

}
