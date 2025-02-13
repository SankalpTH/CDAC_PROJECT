package com.example.demo.controllers;


import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.DummyPgImages;
import com.example.demo.entities.FilterRequest;
import com.example.demo.entities.Pg;
import com.example.demo.repositories.PgRepository;
import com.example.demo.services.PgService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/crud")
public class PgController {

	@Autowired
	PgService pservice;
	@Autowired
	PgRepository prepo;
    @PostMapping(value = "/addPg/{oid}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public String savePg(
        @RequestPart("pgDetails") String pgDetailsJson,  // JSON as String
        @PathVariable int oid,
        @RequestPart(value = "image1", required = false) MultipartFile image1,
        @RequestPart(value = "image2", required = false) MultipartFile image2,
        @RequestPart(value = "image3", required = false) MultipartFile image3,
        @RequestPart(value = "image4", required = false) MultipartFile image4
    ) throws Exception {
        
        // Convert JSON String to Object
        ObjectMapper objectMapper = new ObjectMapper();
        DummyPgImages dpi = objectMapper.readValue(pgDetailsJson, DummyPgImages.class);
        
        // Set images to `DummyPgImages`
        dpi.setImage1(image1);
        dpi.setImage2(image2);
        dpi.setImage3(image3);
        dpi.setImage4(image4);
        
        return pservice.addPg(oid, dpi);
    }
	
	@PutMapping("/updatePg/{pgId}/{areaId}")
	public Pg updatePg(@PathVariable int pgId, @RequestBody DummyPgImages dpi, @PathVariable int areaId) throws Exception {
	    return pservice.updatePg(pgId, dpi, areaId);
	}
	@GetMapping("/getall")
	public List<Pg> getPg() {
		return prepo.findAll();
	}
	@GetMapping("/getOwnerPg/{oid}")
	public List<Pg> getPgByOwner(@PathVariable int oid){
		return pservice.getPgByOwner(oid);
	}
	@PostMapping("/searchPg")
    public ResponseEntity<List<Pg>> getPg(@RequestBody FilterRequest request) {
        List<Pg> pgList = pservice.getPg(request.getAreaName(), request.getCityId(), 
                                         request.isWifi(), request.isAc(), request.isLaundry());
        return ResponseEntity.ok(pgList);
    }
	@GetMapping("/getSinglePg/{pid}")
	public Optional<Pg> getOnClick(@PathVariable int pid) {
		return pservice.getPgOnClick(pid);
	}
}