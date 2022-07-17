package com.booking.codeinn.controllers;

import com.booking.codeinn.entities.Reservation;
import com.booking.codeinn.exceptions.ResourceNotFoundException;
import com.booking.codeinn.service.interfaces.IReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    private IReservationService reservationService;

    @Autowired
    public ReservationController(IReservationService reservationService){
        this.reservationService = reservationService;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllReservations() {
        return ResponseEntity.ok(reservationService.listAll());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> findReservationById(@PathVariable Integer id) throws ResourceNotFoundException {
        return ResponseEntity.ok(reservationService.findById(id));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> findUserReservations(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(reservationService.findAllUserReservations(id));
    }

    @GetMapping("/accommodation/{id}")
    public ResponseEntity<?> findAllReservationsByAccId(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(reservationService.findAllReservedAccommodationsById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createReservation(@RequestBody Reservation reservation) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reservationService.create(reservation));
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editReservation(@RequestBody Reservation reservation) throws ResourceNotFoundException{
        return ResponseEntity.status(HttpStatus.OK).body(reservationService.edit(reservation));
    }
}
