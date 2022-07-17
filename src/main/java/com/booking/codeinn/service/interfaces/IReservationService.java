package com.booking.codeinn.service.interfaces;

import com.booking.codeinn.dto.ReservationDTO;
import com.booking.codeinn.dto.ReservationFilterAccDTO;
import com.booking.codeinn.dto.ReservationFilterUserDTO;
import com.booking.codeinn.entities.Reservation;
import com.booking.codeinn.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface IReservationService {
    ReservationDTO create(Reservation reservation);
    ReservationDTO findById(Integer id) throws ResourceNotFoundException;
    List<ReservationDTO> listAll();
    List<ReservationFilterUserDTO> findAllUserReservations(Integer id);
    List<ReservationFilterAccDTO> findAllReservedAccommodationsById(Integer id);
    ReservationDTO edit(Reservation reservation) throws ResourceNotFoundException;
    void removeById(Integer id) throws ResourceNotFoundException;
}
