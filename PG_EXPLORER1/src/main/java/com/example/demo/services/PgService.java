package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.DummyPgImages;
import com.example.demo.entities.Images;
import com.example.demo.entities.Owner;
import com.example.demo.entities.Pg;
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

public String addPg(int onid, DummyPgImages dpi) throws Exception {
    // Check for null or invalid input data
    if (dpi == null) {
        throw new Exception("Invalid data provided");
    }

    // Find the owner by ID
    Owner owner = orepo.findById(onid).orElse(null);
    if (owner == null) {
        throw new Exception("Owner does not exist");
    }

    // Create and populate Pg entity
    Pg pg = new Pg();
    pg.setPgName(dpi.getPgName());
    pg.setPgAddress(dpi.getPgAddress());
    pg.setPricing(dpi.getPricing());
    pg.setDescription(dpi.getDescription());
    pg.setWifi(dpi.isWifi());
    pg.setAc(dpi.isAc());
    pg.setLaundry(dpi.isLaundry());
    pg.setOwner(owner);

    // Save Pg entity
    prepo.save(pg);

    // Create and populate Images entity
    Images images = new Images();
    images.setImage1(dpi.getImage1());
    images.setImage2(dpi.getImage2());
    images.setImage3(dpi.getImage3());
    images.setImage4(dpi.getImage4());
    images.setPg(pg);

    // Save Images entity
    irepo.save(images);

    return "Added Successfully";
}
public Optional<Pg> getPg(int pid) {
	return prepo.findById(pid);
    }
public List<Pg> getPg(String aname,boolean wifi,boolean ac,boolean laundry){
	return prepo.findPGsByFilters(aname, wifi, ac, laundry);
}
}
