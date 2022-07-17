package com.booking.codeinn.service.interfaces;

import com.booking.codeinn.dto.CategoryDTO;
import com.booking.codeinn.entities.Category;
import com.booking.codeinn.exceptions.ResourceNotFoundException;
import java.util.List;

public interface ICategoryService {
    Category create(Category category);
    Category findById(Integer id) throws ResourceNotFoundException;
    List<CategoryDTO> listAll();
    Category edit(Category categoryDTO) throws ResourceNotFoundException;
    void removeById(Integer id) throws ResourceNotFoundException;
}
