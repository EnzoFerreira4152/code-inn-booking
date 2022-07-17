package com.booking.codeinn.service.interfaces;

import com.booking.codeinn.entities.Image;
import com.booking.codeinn.exceptions.ResourceNotFoundException;
import java.util.List;

public interface IImageService {

    Image createImage(Image image);
    Image findImageById(Integer id) throws ResourceNotFoundException;
    Image editImage(Image image) throws ResourceNotFoundException;
    List<Image> listAllImages();
    void removeImageById(Integer id) throws ResourceNotFoundException;

}
