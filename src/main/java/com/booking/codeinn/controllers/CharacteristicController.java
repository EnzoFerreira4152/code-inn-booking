package com.booking.codeinn.controllers;

import com.booking.codeinn.entities.Characteristic;
import com.booking.codeinn.exceptions.ResourceNotFoundException;
import com.booking.codeinn.service.interfaces.ICharacteristicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/characteristics")
public class CharacteristicController {

    private final ICharacteristicService characteristicService;

    @Autowired
    public CharacteristicController(ICharacteristicService characteristicService) {
        this.characteristicService = characteristicService;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllCharacteristics(){
        return ResponseEntity.ok(characteristicService.listAllCharacteristics());
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCharacteristic(@RequestBody Characteristic characteristic){
        return ResponseEntity.status(HttpStatus.CREATED).body(characteristicService.createCharacteristic(characteristic));
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editCharacteristic(@RequestBody Characteristic characteristic) throws ResourceNotFoundException {
        return ResponseEntity.ok(characteristicService.editCharacteristic(characteristic));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> removeCharacteristicById(@PathVariable Integer id) throws ResourceNotFoundException {
        characteristicService.deleteCharacteristicById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("OK");
    }
}
