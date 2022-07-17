package com.booking.codeinn.service.impl;

import com.booking.codeinn.dto.AccommodationDTO;
import com.booking.codeinn.dto.CategoryDTO;
import com.booking.codeinn.dto.CityDTO;
import com.booking.codeinn.entities.Accommodation;
import com.booking.codeinn.exceptions.BadRequestException;
import com.booking.codeinn.exceptions.ResourceNotFoundException;
import com.booking.codeinn.repository.IAccommodationRepository;
import com.booking.codeinn.service.interfaces.IAccommodationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class AccommodationService implements IAccommodationService {

    private IAccommodationRepository accommodationRepository;
    private ObjectMapper mapper;

    @Autowired
    public AccommodationService(IAccommodationRepository accommodationRepository, ObjectMapper mapper){
        this.accommodationRepository = accommodationRepository;
        this.mapper = mapper;
    }

    //-------------------------------------------------- Utils --------------------------------------------------//
    private Accommodation saveAccommodation(Accommodation accommodation){
        return accommodationRepository.save(accommodation);
    }
    private AccommodationDTO convertAccommodationToDTO(Accommodation accommodation) {
        AccommodationDTO accommodationDTO = mapper.convertValue(accommodation, AccommodationDTO.class);
        accommodationDTO.setCategory(mapper.convertValue(accommodation.getCategory(), CategoryDTO.class));
        accommodationDTO.setCity(mapper.convertValue(accommodation.getCity(), CityDTO.class));
        return accommodationDTO;
    }
    protected List<AccommodationDTO> listAllAccommodationsToDTO (List<Accommodation> accommodations) {
        List<AccommodationDTO> results = new ArrayList<>();
        for(Accommodation a : accommodations){
            results.add(convertAccommodationToDTO(a));
        }
        return results;
    }
    private List<AccommodationDTO> shuffleAccommodations(List<AccommodationDTO> accommodations){
        Collections.shuffle(accommodations, new Random());
        return accommodations;
    }
    //-------------------------------------------------- ///// --------------------------------------------------//

    @Override
    public AccommodationDTO create(Accommodation accommodation) {
        return convertAccommodationToDTO(saveAccommodation(accommodation));
    }

    @Override
    public AccommodationDTO findById(Integer id) throws ResourceNotFoundException {
        Accommodation a = accommodationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("The accommodation does not exist"));
        return convertAccommodationToDTO(a);
    }

    @Override
    public List<AccommodationDTO> findAllByCategoryTitle(String category) {
        List<Accommodation> a = accommodationRepository.findAllByCategoryTitle(category);
        return listAllAccommodationsToDTO(a);
    }

    @Override
    public List<AccommodationDTO> findAllByCityName (String city) {
        return listAllAccommodationsToDTO(accommodationRepository.findAllByCityName(city));
    }

    @Override
    public List<AccommodationDTO> findAllByCityAndDates(String city, String stDate, String fiDate) {
        DateTimeFormatter ft = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate st = LocalDate.parse(stDate, ft);
        LocalDate fi = LocalDate.parse(fiDate, ft);
        return listAllAccommodationsToDTO(accommodationRepository.filter(city, st, fi));
    }

    @Override
    public List<AccommodationDTO> listAll() {
        return listAllAccommodationsToDTO(accommodationRepository.findAll());
    }

    @Override
    public AccommodationDTO edit(Accommodation accommodation) throws ResourceNotFoundException {
        accommodationRepository.findById(accommodation.getId())
                .orElseThrow(() -> new ResourceNotFoundException("The accommodation does not exist"));
        return convertAccommodationToDTO(saveAccommodation(accommodation));
    }

    @Override
    public void removeById(Integer id) throws ResourceNotFoundException {
        accommodationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("The accommodation does not exist"));
        accommodationRepository.deleteById(id);
    }

    @Override
    public List<AccommodationDTO> randomize(){
        List<AccommodationDTO> list = listAllAccommodationsToDTO(accommodationRepository.findAll());
        return shuffleAccommodations(list);
    }

}