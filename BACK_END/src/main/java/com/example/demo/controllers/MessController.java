package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Mess;
import com.example.demo.services.MessService;

@RestController
public class MessController {
@Autowired
MessService mservice;

@PostMapping("/addMess/{oid}")
public Mess saveMess(@RequestBody Mess mess,@PathVariable int oid) throws Exception {
	return mservice.addMess(oid, mess);
}
}
