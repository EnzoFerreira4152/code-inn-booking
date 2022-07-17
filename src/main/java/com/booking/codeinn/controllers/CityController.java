package com.booking.codeinn.controllers;

import com.booking.codeinn.entities.City;
import com.booking.codeinn.exceptions.ResourceNotFoundException;
import com.booking.codeinn.service.interfaces.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cities")
public class CityController {

    private final ICityService cityService;

    @Autowired
    public CityController(ICityService cityService){
        this.cityService = cityService;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllCities(){
        return ResponseEntity.ok(cityService.listAll());
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCity(@RequestBody City city){
        return ResponseEntity.status(HttpStatus.CREATED).body(cityService.create(city));
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editCity(@RequestBody City city) throws ResourceNotFoundException {
        return ResponseEntity.ok(cityService.edit(city));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> removeCityById(@PathVariable("id") Integer id) throws  ResourceNotFoundException {
        cityService.removeById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("OK");
    }
}
