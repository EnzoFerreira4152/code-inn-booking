package com.booking.codeinn.service.interfaces;

import com.booking.codeinn.entities.Characteristic;
import com.booking.codeinn.exceptions.ResourceNotFoundException;

import java.util.List;

public interface ICharacteristicService {

    Characteristic createCharacteristic(Characteristic characteristicDTO);
    Characteristic findCharacteristicById(Integer id) throws ResourceNotFoundException;
    List<Characteristic> listAllCharacteristics();
    Characteristic editCharacteristic(Characteristic characteristic) throws ResourceNotFoundException;
    void deleteCharacteristicById(Integer id) throws ResourceNotFoundException;

}
