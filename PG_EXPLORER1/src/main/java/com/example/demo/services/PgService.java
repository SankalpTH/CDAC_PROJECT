package com.example.demo.services;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    public byte[] convertMultipartFileToByteArray(MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            return file.getBytes(); // Convert MultipartFile to byte array
        }
        return new byte[0]; // Return an empty array if file is null or empty
    }

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
        
        Images image = new Images();
        image.setImage1(convertMultipartFileToByteArray(dpi.getImage1()));
        image.setImage2(convertMultipartFileToByteArray(dpi.getImage2()));
        image.setImage3(convertMultipartFileToByteArray(dpi.getImage3()));
        image.setImage4(convertMultipartFileToByteArray(dpi.getImage4()));
        irepo.save(image);

        Pg pg=new Pg();
        pg.setPgName(dpi.getPgName());
        pg.setPgAddress(dpi.getPgAddress());
        pg.setPricing(dpi.getPricing());
        pg.setDescription(dpi.getDescription());
        pg.setWifi(dpi.isWifi());
        pg.setAc(dpi.isAc());
        pg.setgLink(dpi.getgLink());
        pg.setLaundry(dpi.isLaundry());
        pg.setOwner(owner);
        pg.setArea(area);
        pg.setImages(image);
        prepo.save(pg);
    
		return "Added";
    }
 // Update existing PG with new details and images
    public Pg updatePg(int pgId, DummyPgImages dpi, int aid) throws Exception {
        // Fetch existing PG by ID
        Pg pg = prepo.findById(pgId).orElseThrow(() -> new Exception("PG not found"));

        // Fetch the associated Area
        Area area = arepo.findById(aid).orElseThrow(() -> new Exception("Area not found"));

        // Update PG details
        pg.setPgName(dpi.getPgName());
        pg.setPgAddress(dpi.getPgAddress());
        pg.setPricing(dpi.getPricing());	
        pg.setDescription(dpi.getDescription());
        pg.setWifi(dpi.isWifi());
        pg.setAc(dpi.isAc());
        pg.setLaundry(dpi.isLaundry());
        pg.setArea(area);

        // Fetch existing images
        Images images = irepo.findById(pg.getImages().getImageId())
                .orElseThrow(() -> new Exception("PG images not found"));

        // Update images only if new ones are provided
        if (dpi.getImage1() != null && !dpi.getImage1().isEmpty()) {
            images.setImage1(convertMultipartFileToByteArray(dpi.getImage1()));
        }
        if (dpi.getImage2() != null && !dpi.getImage2().isEmpty()) {
            images.setImage2(convertMultipartFileToByteArray(dpi.getImage2()));
        }
        if (dpi.getImage3() != null && !dpi.getImage3().isEmpty()) {
            images.setImage3(convertMultipartFileToByteArray(dpi.getImage3()));
        }
        if (dpi.getImage4() != null && !dpi.getImage4().isEmpty()) {
            images.setImage4(convertMultipartFileToByteArray(dpi.getImage4()));
        }

        // Save updated images
        irepo.save(images);

        // Save updated PG
        return prepo.save(pg);
    }
    public Optional<Pg> getPg(int pid) {
        return prepo.findById(pid);
    }

    public List<Pg> getPg(String aname, boolean wifi, boolean ac, boolean laundry) {
        return prepo.findPGsByFilters(aname, wifi, ac, laundry);
    }
	
}
