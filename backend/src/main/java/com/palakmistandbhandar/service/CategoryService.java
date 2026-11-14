package com.palakmistandbhandar.service;

import com.palakmistandbhandar.dto.CategoryDTO;
import com.palakmistandbhandar.model.Category;
import com.palakmistandbhandar.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDTO> getAllActiveCategories() {
        return categoryRepository.findByActiveTrueOrderByDisplayOrderAsc()
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll()
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public CategoryDTO getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }

    public CategoryDTO createCategory(CategoryDTO dto) {
        Category category = Category.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .imageUrl(dto.getImageUrl())
                .displayOrder(dto.getDisplayOrder())
                .active(dto.getActive() != null ? dto.getActive() : true)
                .build();
        return toDTO(categoryRepository.save(category));
    }

    public CategoryDTO updateCategory(Long id, CategoryDTO dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        category.setImageUrl(dto.getImageUrl());
        category.setDisplayOrder(dto.getDisplayOrder());
        if (dto.getActive() != null) category.setActive(dto.getActive());
        return toDTO(categoryRepository.save(category));
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    private CategoryDTO toDTO(Category c) {
        return CategoryDTO.builder()
                .id(c.getId())
                .name(c.getName())
                .description(c.getDescription())
                .imageUrl(c.getImageUrl())
                .displayOrder(c.getDisplayOrder())
                .active(c.getActive())
                .build();
    }
}
