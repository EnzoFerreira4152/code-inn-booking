package com.booking.codeinn.service.impl;

import com.booking.codeinn.dto.CityDTO;
import com.booking.codeinn.entities.City;
import com.booking.codeinn.exceptions.ResourceNotFoundException;
import com.booking.codeinn.repository.ICityRepository;
import com.booking.codeinn.service.interfaces.ICityService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CityService implements ICityService {

    private final ICityRepository cityRepository;
    private final ObjectMapper mapper;

    @Autowired
    public CityService(ICityRepository cityRepository, ObjectMapper mapper) {
        this.cityRepository = cityRepository;
        this.mapper = mapper;
    }

    //-------------------------------------------------- Utils --------------------------------------------------//
    private City saveCity(City city){
        return cityRepository.save(city);
    }
    //-------------------------------------------------- ///// --------------------------------------------------//

    @Override
    public City create(City city) {
        return saveCity(city);
    }

    @Override
    public List<CityDTO> listAll() {
        List<CityDTO> results = new ArrayList<>();
        for (City city : cityRepository.findAll()) {
            results.add(mapper.convertValue(city, CityDTO.class));
        }
         return results;
    }

    @Override
    public City edit(City city) throws ResourceNotFoundException {
        cityRepository.findById(city.getId())
                .orElseThrow(() -> new ResourceNotFoundException("The city does not exist"));
        return saveCity(city);
    }

    @Override
    public void removeById(Integer id) throws ResourceNotFoundException {
        cityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("The city does not exist"));
        cityRepository.deleteById(id);
    }
}
