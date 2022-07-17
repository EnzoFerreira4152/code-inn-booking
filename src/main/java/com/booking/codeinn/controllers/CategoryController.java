package com.booking.codeinn.controllers;

import com.booking.codeinn.entities.Category;
import com.booking.codeinn.exceptions.ResourceNotFoundException;
import com.booking.codeinn.service.interfaces.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final ICategoryService categoryService;

    @Autowired
    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllCategories(){
        return ResponseEntity.ok(categoryService.listAll());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> findCategoryById(@PathVariable("id") Integer id) throws ResourceNotFoundException  {
        return ResponseEntity.ok(categoryService.findById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCategory(@RequestBody Category category){
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.create(category));
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editCategory(@RequestBody Category category) throws ResourceNotFoundException {
        return ResponseEntity.ok(categoryService.edit(category));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> removeCategoryById(@PathVariable("id") Integer id) throws ResourceNotFoundException {
        categoryService.removeById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("OK");
    }

}