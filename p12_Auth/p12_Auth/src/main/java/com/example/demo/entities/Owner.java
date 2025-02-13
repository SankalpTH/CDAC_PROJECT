package com.example.demo.entities;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.Cascade;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
@Entity
@Table(name="owner")
public class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int oid;
    @Column(name="adharcard_number")
    private String adharcardNumber;

    @Enumerated(EnumType.STRING)
    private OwnerType type;

    @JsonIgnoreProperties("owner")
    @OneToOne    
    @JoinColumn(name = "uid")
    private User user;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Pg> pgs;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Mess> messes;

    // Getters and Setters
    public int getOid() {
        return oid;
    }

    public void setOid(int oid) {
        this.oid = oid;
    }

    public OwnerType getType() {
        return type;
    }

    public void setType(OwnerType type) {
        this.type = type;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAdharcardNumber() {
        return adharcardNumber;
    }

    public void setAdharcardNumber(String adharcardNumber) {
        this.adharcardNumber = adharcardNumber;
    }

    public List<Pg> getPgs() {
        return pgs;
    }

    public void setPgs(List<Pg> pgs) {
        this.pgs = pgs;
    }

    public List<Mess> getMesses() {
        return messes;
    }

    public void setMesses(List<Mess> messes) {
        this.messes = messes;
    }

    public Owner(int oid, String adharcardNumber, OwnerType type, List<Pg> pgs, List<Mess> messes, User user) {
        super();
        this.oid = oid;
        this.adharcardNumber = adharcardNumber;
        this.type = type;
        this.pgs = pgs;
        this.messes = messes;
        this.user = user;
    }

    public Owner() {
        super();
    }
}

