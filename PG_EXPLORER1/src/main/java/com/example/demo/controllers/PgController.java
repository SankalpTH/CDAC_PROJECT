package com.example.demo.controllers;


import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.DummyPgImages;
import com.example.demo.entities.Pg;
import com.example.demo.repositories.PgRepository;
import com.example.demo.services.PgService;

@RestController
public class PgController {

	@Autowired
	PgService pservice;
	@Autowired
	PgRepository prepo;
	
	@PostMapping(value = "/addPg/{oid}/{aid}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public String savePg(
	    @PathVariable int oid,
	    @PathVariable int aid,
	    @RequestPart("pgDetails") DummyPgImages dpi,  // JSON object
	    @RequestPart(value = "image1", required = false) MultipartFile image1,
	    @RequestPart(value = "image2", required = false) MultipartFile image2,
	    @RequestPart(value = "image3", required = false) MultipartFile image3,
	    @RequestPart(value = "image4", required = false) MultipartFile image4
	) throws Exception {
	    
	    // Set images to `DummyPgImages`
	    dpi.setImage1(image1);
	    dpi.setImage2(image2);
	    dpi.setImage3(image3);
	    dpi.setImage4(image4);

	    return pservice.addPg(oid, dpi, aid);
	}
	@GetMapping("/getPg/{aname}/{wifi}/{ac}/{laundry}")
	public List<Pg> getPg( @PathVariable String aname,
	        @PathVariable boolean wifi,
	        @PathVariable boolean ac,
	        @PathVariable boolean laundry) {
		return pservice.getPg(aname, wifi, ac, laundry);
	}
	@PutMapping("/updatePg/{pgId}/{areaId}")
	public Pg updatePg(@PathVariable int pgId, @RequestBody DummyPgImages dpi, @PathVariable int areaId) throws Exception {
	    return pservice.updatePg(pgId, dpi, areaId);
	}
	@GetMapping("/getall")
	public List<Pg> getPg() {
		return prepo.findAll();
	}
}
