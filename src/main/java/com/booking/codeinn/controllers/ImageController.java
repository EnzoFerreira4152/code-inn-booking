package com.booking.codeinn.controllers;

import com.booking.codeinn.entities.Image;
import com.booking.codeinn.exceptions.ResourceNotFoundException;
import com.booking.codeinn.service.interfaces.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/images")
public class ImageController {

    private final IImageService iImageService;

    @Autowired
    public ImageController(IImageService iImageService){
        this.iImageService = iImageService;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllImages(){
        return ResponseEntity.ok(iImageService.listAllImages());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getImageById(@PathVariable Integer id) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(iImageService.findImageById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createImage(@RequestBody Image image){
        return ResponseEntity.status(HttpStatus.CREATED).body(iImageService.createImage(image));
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editImage(Image image) throws ResourceNotFoundException{
        return ResponseEntity.status(HttpStatus.OK).body(iImageService.editImage(image));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable Integer id) throws ResourceNotFoundException{
        iImageService.removeImageById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("OK");
    }
}
