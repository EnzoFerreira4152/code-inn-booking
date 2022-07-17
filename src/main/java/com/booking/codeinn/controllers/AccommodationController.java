package com.booking.codeinn.controllers;

import com.booking.codeinn.dto.AccommodationDTO;
import com.booking.codeinn.entities.Accommodation;
import com.booking.codeinn.exceptions.BadRequestException;
import com.booking.codeinn.exceptions.ResourceNotFoundException;
import com.booking.codeinn.service.interfaces.IAccommodationService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accommodations")
public class AccommodationController {

    private final IAccommodationService accommodationService;

    @Autowired
    public AccommodationController(IAccommodationService accommodationService){
        this.accommodationService = accommodationService;
    }

    @ApiOperation(
            value = "List all accommodations",
            notes = "This method recovers all the accommodations and returns an array of accommodations.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = AccommodationDTO.class),
            @ApiResponse(code = 500, message = "Server Error")})
    @GetMapping("/all")
    public ResponseEntity<?> getAllAccommodations(){
        return ResponseEntity.ok(accommodationService.listAll());
    }

    @ApiOperation(
            value = "Find one accommodations by id",
            notes = "This method recovers one accommodation that match with the parameter passed in the URL.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = AccommodationDTO.class),
            @ApiResponse(code = 500, message = "Server Error")})
    @GetMapping("/id/{id}")
    public ResponseEntity<?> findAccommodationById(@PathVariable Integer id) throws ResourceNotFoundException{
        return ResponseEntity.ok(accommodationService.findById(id));
    }

    @ApiOperation(
            value = "Search accommodations by",
            notes = "This method recovers all accommodation that match with the search params passed in the URL. They can be this next combinations: 1- category 2- city 3- city and a start date and a finish date. If you try to send any other combination you will recived a bad request response")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = AccommodationDTO.class),
            @ApiResponse(code = 400, message = "Bad Request"),
            @ApiResponse(code = 500, message = "Server Error")})
    @GetMapping("/search")
    public ResponseEntity<?> findBySearch (
            @RequestParam(defaultValue = "", required = false) @ApiParam("category") String category,
            @RequestParam (defaultValue = "", required = false) String city,
            @RequestParam(defaultValue = "", required = false) String startDate,
            @RequestParam(defaultValue = "", required = false) String finishDate)
            throws ResourceNotFoundException, BadRequestException {
        if(!category.equals("") && city.equals("") && startDate.equals("") && finishDate.equals("")) {
            return ResponseEntity.ok(accommodationService.findAllByCategoryTitle(category));
        }
        if(category.equals("") && !city.equals("") && startDate.equals("") && finishDate.equals("")){
            return ResponseEntity.ok(accommodationService.findAllByCityName(city));
        }
        if(category.equals("") && !city.equals("") && !startDate.equals("") && !finishDate.equals("")){
            return ResponseEntity.ok(accommodationService.findAllByCityAndDates(city, startDate, finishDate));
        }else{
            throw new BadRequestException("The search params aren't correct");
        }
    }

    @ApiOperation(
            value = "Create accommodation",
            notes = "This method creates an accommodation.")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Created", response = AccommodationDTO.class),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping("/create")
    public ResponseEntity<?> createAccommodation(@RequestBody Accommodation accommodation) {
        return ResponseEntity.status(HttpStatus.CREATED).body(accommodationService.create(accommodation));
    }

    @ApiOperation(
            value = "Edit accommodation",
            notes = "This method edits an accommodation.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = AccommodationDTO.class),
            @ApiResponse(code = 500, message = "Server Error")})
    @PutMapping("/edit")
    public ResponseEntity<?> editAccommodation(@RequestBody Accommodation accommodation) throws ResourceNotFoundException{
        return ResponseEntity.status(HttpStatus.OK).body(accommodationService.edit(accommodation));
    }

    @ApiOperation(
            value = "Delete accommodation by id",
            notes = "This method edits an accommodation.")
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "No content", response = String.class),
            @ApiResponse(code = 500, message = "Server Error")})
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> removeAccommodationById(@PathVariable Integer id) throws ResourceNotFoundException{
        accommodationService.removeById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("OK");
    }

}
