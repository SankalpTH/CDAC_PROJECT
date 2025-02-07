package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import com.example.demo.entities.DummyMessImages;
import com.example.demo.entities.Mess;
import com.example.demo.entities.MessType;
import com.example.demo.services.MessService;

@RestController
public class MessController {
	@Autowired
	MessService mservice;

	@PostMapping(value = "/addMess/{oid}/{aid}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public Mess saveMess(@PathVariable int oid, @PathVariable int aid, @RequestPart("messDetails") DummyMessImages dmi, // JSON
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

		return mservice.addMess(oid, dmi, aid);
	}

	@GetMapping("getMess/{type}/{areaName}")
	public List<Mess> getMess(@PathVariable MessType type, @PathVariable String areaName) {
		return mservice.getMess(type, areaName);
	}

	@PutMapping("/updateMess/{messId}/{areaId}")
	public Mess updateMess(@PathVariable int messId, @RequestBody DummyMessImages dmi, @PathVariable int areaId)
			throws Exception {
		return mservice.updateMess(messId, dmi, areaId);
	}
}
