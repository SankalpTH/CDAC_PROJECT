package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entities.Owner;
import com.example.demo.entities.Pg;
import com.example.demo.repositories.OwnerRepository;
import com.example.demo.repositories.PgRepository;

@Service
public class PgService {
@Autowired
OwnerRepository orepo;

@Autowired
PgRepository prepo;

public Pg addPg(Pg pg,int onid) throws Exception {
	Owner owner=orepo.findById(onid).orElse(null);
	if(owner==null) {
		throw new Exception("Oner not exosts");
	}
	pg.setOwner(owner);
	return prepo.save(pg);
}
public Optional<Pg> getPg(int pid) {
	return prepo.findById(pid);
    }
public List<Pg> getPg(String aname,boolean wifi,boolean ac,boolean laundry){
	return prepo.findPGsByFilters(aname, wifi, ac, laundry);
}
}
