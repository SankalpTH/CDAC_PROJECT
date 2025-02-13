package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.DummyArea;
import com.example.demo.services.AreaService;


//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/crud")
public class AreaController {

    @Autowired
    private AreaService areaService;

    @GetMapping("/byCity/{cityId}")
    public ResponseEntity<List<DummyArea>> getAreasByCity(@PathVariable int cityId) {
        List<DummyArea> areas = areaService.getAllAreasByCityId(cityId);
        return ResponseEntity.ok(areas); // Return only area names
    }
}