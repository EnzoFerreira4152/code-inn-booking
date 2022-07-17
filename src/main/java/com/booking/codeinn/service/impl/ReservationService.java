package com.booking.codeinn.service.impl;

import com.booking.codeinn.dto.*;
import com.booking.codeinn.entities.Accommodation;
import com.booking.codeinn.entities.Reservation;
import com.booking.codeinn.exceptions.ResourceNotFoundException;
import com.booking.codeinn.repository.IAccommodationRepository;
import com.booking.codeinn.repository.IReservationRepository;
import com.booking.codeinn.security.model.User;
import com.booking.codeinn.security.repository.IUserRepository;
import com.booking.codeinn.service.interfaces.IReservationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService implements IReservationService {

    private IReservationRepository reservationRepository;
    private IAccommodationRepository accommodationRepository;
    private IUserRepository userRepository;
    private ObjectMapper mapper;

    @Autowired
    public ReservationService(IReservationRepository reservationRepository, IAccommodationRepository accommodationRepository, IUserRepository userRepository, ObjectMapper mapper) {
        this.reservationRepository = reservationRepository;
        this.accommodationRepository = accommodationRepository;
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    //--------------------------------------------- Utils ---------------------------------------------//
    private Reservation saveReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }
    private ReservationDTO convertReservationToDTO(Reservation reservation) {
        ReservationDTO resDTO = new ReservationDTO();
        AccommodationForReservationDTO accDTO = new AccommodationForReservationDTO();

        User user = userRepository.findById(reservation.getUser().getId()).get();
        Accommodation accommodation = accommodationRepository.findById(reservation.getAccommodation().getId()).get();

        accDTO.setId(accommodation.getId());
        accDTO.setTitle(accommodation.getTitle());
        accDTO.setCategory(accommodation.getCategory().getTitle());
        accDTO.setCity(accommodation.getCity().getName());

        resDTO.setId(reservation.getId());
        resDTO.setArrivalTime(reservation.getArrivalTime());
        resDTO.setStartDate(reservation.getStartDate());
        resDTO.setFinishDate(reservation.getFinishDate());
        resDTO.setAccommodation(accDTO);
        resDTO.setUserID(user.getId());

        return resDTO;
    }
    private List<ReservationFilterUserDTO> reservationFilterUser(List<Reservation> reservations) {
        List<ReservationFilterUserDTO> results = new ArrayList<>();

        for(Reservation r : reservations){
            Accommodation accommodation = accommodationRepository.findById(r.getAccommodation().getId()).get();
            ReservationFilterUserDTO resDTO = new ReservationFilterUserDTO();

            AccommodationDTO accDTO = mapper.convertValue(accommodation, AccommodationDTO.class);
            accDTO.setCategory(mapper.convertValue(accommodation.getCategory(), CategoryDTO.class));
            accDTO.setCity(mapper.convertValue(accommodation.getCity(), CityDTO.class));

            resDTO.setId(r.getId());
            resDTO.setArrivalTime(r.getArrivalTime());
            resDTO.setStartDate(r.getStartDate());
            resDTO.setFinishDate(r.getFinishDate());
            resDTO.setAccommodation(accDTO);

            results.add(resDTO);
        }

        return  results;
    }
    private List<ReservationFilterAccDTO> reservationFilterAccommodation(List<Reservation> reservations) {
        List<ReservationFilterAccDTO> results = new ArrayList<>();

        for(Reservation r : reservations){
            ReservationFilterAccDTO resDTO = new ReservationFilterAccDTO();
            User user = userRepository.findById(r.getUser().getId()).get();

            resDTO.setId(r.getId());
            resDTO.setArrivalTime(r.getArrivalTime());
            resDTO.setStartDate(r.getStartDate());
            resDTO.setFinishDate(r.getFinishDate());
            resDTO.setUserID(user.getId());

            results.add(resDTO);
        }

        return results;
    }
    private List<ReservationDTO> listAllReservationsToDTO (List<Reservation> reservations) {
        List<ReservationDTO> results = new ArrayList<>();
        for(Reservation r : reservations){
            results.add(convertReservationToDTO(r));
        }
        return results;
    }
    //--------------------------------------------- ///// ---------------------------------------------//

    @Override
    public ReservationDTO create(Reservation reservation) {
        return convertReservationToDTO(saveReservation(reservation));
    }

    @Override
    public ReservationDTO findById(Integer id) throws ResourceNotFoundException {
        return convertReservationToDTO(reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("The reservation does not exist")));
    }

    @Override
    public List<ReservationDTO> listAll() {
        return listAllReservationsToDTO(reservationRepository.findAll());
    }

    @Override
    public List<ReservationFilterUserDTO> findAllUserReservations(Integer id) {
        return reservationFilterUser(reservationRepository.findUserReservations(id));
    }

    @Override
    public List<ReservationFilterAccDTO> findAllReservedAccommodationsById(Integer id) {
        return reservationFilterAccommodation(reservationRepository.findAllByAccId(id));
    }

    @Override
    public ReservationDTO edit(Reservation reservation) throws ResourceNotFoundException {
        reservationRepository.findById(reservation.getId())
                .orElseThrow(() -> new ResourceNotFoundException("The reservation does not exist"));
        return convertReservationToDTO(saveReservation(reservation));
    }

    @Override
    public void removeById(Integer id) throws ResourceNotFoundException {
        reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("The reservation does not exist"));
        reservationRepository.deleteById(id);
    }

}
