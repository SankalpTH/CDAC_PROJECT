package com.example.demo.services;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entities.Area;
import com.example.demo.entities.DummyMessImages;
import com.example.demo.entities.Mess;
import com.example.demo.entities.MessImages;
import com.example.demo.entities.MessType;
import com.example.demo.entities.Owner;
import com.example.demo.entities.Pg;
import com.example.demo.repositories.AreaRepository;
import com.example.demo.repositories.MessImagesRepository;
import com.example.demo.repositories.MessRepository;
import com.example.demo.repositories.OwnerRepository;

@Service
public class MessService {

	@Autowired
	OwnerRepository orepo;
	@Autowired
	MessRepository mrepo;
	@Autowired
	AreaRepository arepo;
	@Autowired
	MessImagesRepository mirepo;
//	 public byte[] convertMultipartFileToByteArray(MultipartFile file) throws IOException {
//	        if (file != null && !file.isEmpty()) {
//	            return file.getBytes(); // Convert MultipartFile to byte array
//	        }
//	        return new byte[0]; // Return an empty array if file is null or empty
//	    }
		private byte[] convertMultipartFileToByteArray(MultipartFile file) throws IOException {
			if (file != null && !file.isEmpty()) {
	            return file.getBytes(); // Convert MultipartFile to byte array
	        }
	        return new byte[0]; // Return an empty array if file is null or empty
		}
	public Mess addMess(int oid,DummyMessImages dmi) throws Exception {
		System.out.println(dmi.getAreaId());
		Owner owner=orepo.findById(oid).orElse(null);
		if(owner==null) {
			throw new Exception("Associated owner not exist");
		}
		Area area=arepo.findById(dmi.getAreaId()).orElseThrow(()->new Exception("Area not found"+dmi.getAreaId()));
		MessImages mi=new MessImages();
		mi.setImage1(convertMultipartFileToByteArray(dmi.getImage1()));
		mi.setImage2(convertMultipartFileToByteArray(dmi.getImage2()));
		mi.setImage3(convertMultipartFileToByteArray(dmi.getImage3()));
		mi.setImage4(convertMultipartFileToByteArray(dmi.getImage4()));
	     mirepo.save(mi);
		Mess mess=new Mess();
		mess.setMessName(dmi.getMessName());
		mess.setMessAddress(dmi.getMessAddress());
		mess.setDescription(dmi.getDescription());
		mess.setType(dmi.getMessType());
		mess.setGmLink(dmi.getGmLink());
		mess.setPricing(dmi.getPricing());
		mess.setOwner(owner);
		mess.setArea(area);
		mess.setOwner(owner);
		mess.setMessImages(mi);
		
		System.out.println("Received Mess Type: " + dmi.getMessType());


		return mrepo.save(mess);
}

	// Update Mess with Images
    public Mess updateMess(int messId, DummyMessImages dmi, int areaId) throws Exception {
        // Fetch existing Mess by ID
        Mess mess = mrepo.findById(messId)
                .orElseThrow(() -> new Exception("Mess not found"));

        // Fetch the associated Area
        Area area = arepo.findById(areaId)
                .orElseThrow(() -> new Exception("Area not found"));

        // Update Mess details
        mess.setMessName(dmi.getMessName());
        mess.setMessAddress(dmi.getMessAddress());
        mess.setDescription(dmi.getDescription());
        mess.setType(dmi.getMessType());
        mess.setPricing(dmi.getPricing());
        mess.setArea(area);

        // Fetch existing MessImages
        MessImages messImages = (MessImages) mirepo.findById(mess.getMessImages().getMimageId())
                .orElseThrow(() -> new Exception("Mess images not found"));


        // Update images only if new ones are provided
        if (dmi.getImage1() != null && !dmi.getImage1().isEmpty()) {
            messImages.setImage1(convertMultipartFileToByteArray(dmi.getImage1()));
        }
        if (dmi.getImage2() != null && !dmi.getImage2().isEmpty()) {
            messImages.setImage2(convertMultipartFileToByteArray(dmi.getImage2()));
        }
        if (dmi.getImage3() != null && !dmi.getImage3().isEmpty()) {
            messImages.setImage3(convertMultipartFileToByteArray(dmi.getImage3()));
        }
        if (dmi.getImage4() != null && !dmi.getImage4().isEmpty()) {
            messImages.setImage4(convertMultipartFileToByteArray(dmi.getImage4()));
        }

        // Save updated MessImages
        mirepo.save(messImages);

        // Save updated Mess
        return mrepo.save(mess);
    }
	
	public List<Mess> searchMess(MessType type,String areaName,int cityId){
		return mrepo.FindMESSByFilter(type,areaName,cityId);
	}
    public List<Mess> getMessByOwner(int oid) {
        return mrepo.findMESSByOwner(oid);
    }
}