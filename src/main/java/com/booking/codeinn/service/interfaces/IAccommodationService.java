package com.booking.codeinn.service.interfaces;

import com.booking.codeinn.dto.AccommodationDTO;
import com.booking.codeinn.entities.Accommodation;
import com.booking.codeinn.exceptions.BadRequestException;
import com.booking.codeinn.exceptions.ResourceNotFoundException;
import java.util.List;

public interface IAccommodationService {
    AccommodationDTO create(Accommodation accommodation);
    AccommodationDTO findById(Integer id) throws ResourceNotFoundException;
    List<AccommodationDTO> findAllByCategoryTitle(String category);
    List<AccommodationDTO> findAllByCityName (String city);
    List<AccommodationDTO> findAllByCityAndDates(String city, String startDate, String endDate);
    List<AccommodationDTO> listAll();
    AccommodationDTO edit(Accommodation accommodation) throws ResourceNotFoundException;
    void removeById(Integer id) throws ResourceNotFoundException;
    List<AccommodationDTO> randomize();
}
