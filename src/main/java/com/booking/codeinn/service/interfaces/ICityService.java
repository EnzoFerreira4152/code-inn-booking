package com.booking.codeinn.service.interfaces;

import com.booking.codeinn.dto.CityDTO;
import com.booking.codeinn.entities.City;
import com.booking.codeinn.exceptions.ResourceNotFoundException;
import java.util.List;

public interface ICityService {
    City create(City city);
    List<CityDTO> listAll();
    City edit(City city) throws ResourceNotFoundException;
    void removeById(Integer id) throws ResourceNotFoundException;
}
