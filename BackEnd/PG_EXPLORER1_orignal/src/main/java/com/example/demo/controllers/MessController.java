package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import com.example.demo.entities.DummyMessImages;
import com.example.demo.entities.Mess;
import com.example.demo.entities.MessFilter;
import com.example.demo.entities.MessType;
import com.example.demo.entities.Pg;
import com.example.demo.services.MessService;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/crud")
public class MessController {
	@Autowired
	MessService mservice;

	@PostMapping(value = "/addMess/{oid}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public Mess saveMess(@PathVariable int oid,
			@RequestPart("messDetails") DummyMessImages dmi, // JSON
																														// object
			@RequestPart(value = "image1", required = false) MultipartFile image1,
			@RequestPart(value = "image2", required = false) MultipartFile image2,
			@RequestPart(value = "image3", required = false) MultipartFile image3,
			@RequestPart(value = "image4", required = false) MultipartFile image4) throws Exception {

		// Set images to `DummyMessImages`
		dmi.setImage1(image1);
		dmi.setImage2(image2);
		dmi.setImage3(image3);
		dmi.setImage4(image4);

		return mservice.addMess( oid,dmi);
	}

	@PostMapping(value = "/searchMess")
	public List<Mess> getMess(@RequestBody MessFilter mfilter) {
	    return mservice.searchMess(mfilter.getMessType(),mfilter.getAreaName(),mfilter.getCityId());
	}

	@PutMapping("/updateMess/{messId}/{areaId}")
	public Mess updateMess(@PathVariable int messId, @RequestBody DummyMessImages dmi, @PathVariable int areaId)
			throws Exception {
		return mservice.updateMess(messId, dmi, areaId);
	}
	@GetMapping("/getOwnerMess/{oid}")
	public List<Mess> getMessByOwner(@PathVariable int oid){
		return mservice.getMessByOwner(oid);
	}
}