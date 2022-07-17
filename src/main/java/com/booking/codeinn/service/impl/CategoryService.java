package com.booking.codeinn.service.impl;

import com.booking.codeinn.dto.CategoryDTO;
import com.booking.codeinn.entities.*;
import com.booking.codeinn.exceptions.ResourceNotFoundException;
import com.booking.codeinn.repository.IAccommodationRepository;
import com.booking.codeinn.repository.ICategoryRepository;
import com.booking.codeinn.service.interfaces.ICategoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CategoryService implements ICategoryService {

    private ICategoryRepository categoryRepository;
    private ObjectMapper mapper;

    @Autowired
    public CategoryService(ICategoryRepository categoryRepository, ObjectMapper mapper){
        this.categoryRepository = categoryRepository;
        this.mapper = mapper;
    }

    //-------------------------------------------------- Utils --------------------------------------------------//
    private Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }
    //-------------------------------------------------- ///// --------------------------------------------------//

    @Override
    public Category create(Category category) {
        return saveCategory(category);
    }

    @Override
    public Category findById(Integer id) throws ResourceNotFoundException {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("The category does not exist"));
    }

    @Override
    public List<CategoryDTO> listAll() {
        List<CategoryDTO> results = new ArrayList<>();
        for (Category c : categoryRepository.findAll()) {
            CategoryDTO cDTO = mapper.convertValue(c, CategoryDTO.class);
            cDTO.setTotalAccommodations(c.getAccommodations().size());
            results.add(cDTO);
        }
        return results;
    }

    @Override
    public Category edit(Category category) throws ResourceNotFoundException {
        Category response = categoryRepository.findById(category.getId())
                .orElseThrow(() -> new ResourceNotFoundException("The category does not exist"));
        return saveCategory(category);
    }

    @Override
    public void removeById(Integer id) throws ResourceNotFoundException {
        categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("The category does not exist"));
        categoryRepository.deleteById(id);
    }
}

