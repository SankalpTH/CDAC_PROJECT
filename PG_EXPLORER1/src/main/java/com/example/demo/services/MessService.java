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
	 private byte[] convertMultipartFileToByteArray(MultipartFile file) throws IOException {
	        return file.getBytes();
	    }
	public Mess addMess(int onid,DummyMessImages dmi,int aid) throws Exception {
		Owner owner=orepo.findById(onid).orElse(null);
		if(owner==null) {
			throw new Exception("Associated owner not exist");
		}
		Area area=arepo.findById(aid).get();
		Mess mess=new Mess();
		mess.setMessName(dmi.getMessName());
		mess.setMessAddress(dmi.getMessAddress());
		mess.setDescription(dmi.getDescription());
		mess.setType(dmi.getType());
		mess.setPricing(dmi.getPricing());
		mess.setOwner(owner);
		mess.setArea(area);
		mess.setOwner(owner);
		MessImages mi=new MessImages();
		 mi.setImage1(convertMultipartFileToByteArray(dmi.getImage1()));
	     mi.setImage2(convertMultipartFileToByteArray(dmi.getImage2()));
	     mi.setImage3(convertMultipartFileToByteArray(dmi.getImage3()));
	     mi.setImage4(convertMultipartFileToByteArray(dmi.getImage4()));
	     mirepo.save(mi);
		return mrepo.save(mess);
}
	public List<Mess> getMess(MessType type,String areaName){
		return mrepo.FindMESSByFilter(type,areaName);
	}
}
