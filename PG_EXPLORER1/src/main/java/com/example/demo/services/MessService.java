package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Mess;
import com.example.demo.entities.MessType;
import com.example.demo.entities.Owner;
import com.example.demo.repositories.MessRepository;
import com.example.demo.repositories.OwnerRepository;

@Service
public class MessService {

	@Autowired
	OwnerRepository orepo;
	@Autowired
	MessRepository mrepo;
	public Mess addMess(int onid,Mess mess) throws Exception {
		Owner owner=orepo.findById(onid).orElse(null);
		if(owner==null) {
			throw new Exception("Associated owner not exist");
		}
		mess.setOwner(owner);
		return mrepo.save(mess);
}
	public List<Mess> getMess(MessType type,String areaName){
		return mrepo.FindMESSByFilter(type,areaName);
	}
}
