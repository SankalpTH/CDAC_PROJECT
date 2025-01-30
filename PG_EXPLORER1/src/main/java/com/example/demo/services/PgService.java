package com.example.demo.services;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.DummyPgImages;
import com.example.demo.entities.Images;
import com.example.demo.entities.Owner;
import com.example.demo.entities.Area;
import com.example.demo.entities.Pg;
import com.example.demo.repositories.AreaRepository;
import com.example.demo.repositories.ImagesRepository;
import com.example.demo.repositories.OwnerRepository;
import com.example.demo.repositories.PgRepository;

@Service
public class PgService {
    @Autowired
    OwnerRepository orepo;
    @Autowired
    PgRepository prepo;
    @Autowired
    ImagesRepository irepo;
    @Autowired
    AreaRepository arepo;
    public int a=0;
    public String addPg(int oid, DummyPgImages dpi,int aid) throws Exception {
        // Check for null or invalid input data
        if (dpi == null) {
            throw new Exception("Invalid data provided");
        }

        // Find the owner by ID
        Owner owner = orepo.findById(oid).orElse(null);
        if (owner == null) {
            throw new Exception("Owner does not exist");
       }
        Area area =arepo.findById(aid).get();
        Pg pg=new Pg();
        Images image=new Images();
        pg.setPgName(dpi.getPgName());
        pg.setPgAddress(dpi.getPgAddress());
        pg.setPricing(dpi.getPricing());
        pg.setDescription(dpi.getDescription());
        pg.setWifi(dpi.isWifi());
        pg.setAc(dpi.isAc());
        pg.setLaundry(dpi.isLaundry());
        pg.setArea(area);
       image.setImage1(dpi.getImage1());
       image.setImage1(dpi.getImage1());
       image.setImage1(dpi.getImage1());
       image.setImage1(dpi.getImage1());
       
		return "Added";
    }
    public Optional<Pg> getPg(int pid) {
        return prepo.findById(pid);
    }

    public List<Pg> getPg(String aname, boolean wifi, boolean ac, boolean laundry) {
        return prepo.findPGsByFilters(aname, wifi, ac, laundry);
    }
	
}
