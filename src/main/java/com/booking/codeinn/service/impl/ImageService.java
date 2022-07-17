package com.booking.codeinn.service.impl;

import com.booking.codeinn.entities.Image;
import com.booking.codeinn.exceptions.ResourceNotFoundException;
import com.booking.codeinn.repository.IImageRepository;
import com.booking.codeinn.service.interfaces.IImageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ImageService implements IImageService {

    private IImageRepository imageRepository;
    private ObjectMapper mapper;

    @Autowired
    public ImageService(IImageRepository imageRepository, ObjectMapper mapper){
        this.imageRepository = imageRepository;
        this.mapper = mapper;
    }

    private Image saveImage(Image image){
        return imageRepository.save(image);
    }

    @Override
    public Image createImage(Image image) {
        return saveImage(image);
    }

    @Override
    public Image findImageById(Integer id) throws ResourceNotFoundException {
        return imageRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("the image you are looking for hasn't been uploaded to the system"));
    }

    @Override
    public Image editImage(Image image) throws ResourceNotFoundException {
        imageRepository.findById(image.getId()).orElseThrow(()-> new ResourceNotFoundException("the image you are looking for hasn't been uploaded to the system"));
        return saveImage(image);
    }

    @Override
    public List<Image> listAllImages(){
        return imageRepository.findAll();
    }

    @Override
    public void removeImageById(Integer id) throws ResourceNotFoundException {
        imageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("the image you are looking for hasn't been uploaded to the system"));
        imageRepository.deleteById(id);
    }
}
