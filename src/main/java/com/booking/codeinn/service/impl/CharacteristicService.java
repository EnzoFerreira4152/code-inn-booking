package com.booking.codeinn.service.impl;

import com.booking.codeinn.entities.Characteristic;
import com.booking.codeinn.exceptions.ResourceNotFoundException;
import com.booking.codeinn.repository.ICharacteristicRepository;
import com.booking.codeinn.service.interfaces.ICharacteristicService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service

public class CharacteristicService implements ICharacteristicService {

    private ICharacteristicRepository iCharacteristicRepository;
    private ObjectMapper mapper;

    @Autowired
    public CharacteristicService(ICharacteristicRepository characteristicRepository, ObjectMapper mapper){
        this.iCharacteristicRepository = characteristicRepository;
        this.mapper = mapper;
    }

    private Characteristic saveCharacteristic(Characteristic characteristic) {
        return iCharacteristicRepository.save(characteristic);
    }

    @Override
    public Characteristic createCharacteristic(Characteristic characteristic) {
        return saveCharacteristic(characteristic);
    }

    @Override
    public Characteristic findCharacteristicById(Integer id) throws ResourceNotFoundException {
        return iCharacteristicRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("The characteristic does not exist"));
    }

    @Override
    public List<Characteristic> listAllCharacteristics() {
        return new ArrayList<>(iCharacteristicRepository.findAll());
    }

    @Override
    public Characteristic editCharacteristic(Characteristic characteristic) throws ResourceNotFoundException{
        iCharacteristicRepository.findById(characteristic.getId()).orElseThrow(() -> new ResourceNotFoundException("The characteristic does not exist"));
        return saveCharacteristic(characteristic);
    }

    @Override
    public void deleteCharacteristicById(Integer id) throws ResourceNotFoundException {
        iCharacteristicRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("The characteristic does not exist"));
        iCharacteristicRepository.deleteById(id);
    }
}

