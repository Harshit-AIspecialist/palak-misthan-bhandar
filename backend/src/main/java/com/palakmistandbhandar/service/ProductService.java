package com.palakmistandbhandar.service;

import com.palakmistandbhandar.dto.ProductDTO;
import com.palakmistandbhandar.model.Category;
import com.palakmistandbhandar.model.Product;
import com.palakmistandbhandar.repository.CategoryRepository;
import com.palakmistandbhandar.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public List<ProductDTO> getAllAvailableProducts() {
        return productRepository.findByAvailableTrueOrderByNameAsc()
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<ProductDTO> getFeaturedProducts() {
        return productRepository.findByFeaturedTrueAndAvailableTrue()
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsByCategory(Long categoryId) {
        return productRepository.findAvailableByCategory(categoryId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<ProductDTO> searchProducts(String query) {
        return productRepository.searchProducts(query)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ProductDTO getProductById(Long id) {
        return productRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public ProductDTO createProduct(ProductDTO dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        Product product = Product.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .imageUrl(dto.getImageUrl())
                .available(dto.getAvailable() != null ? dto.getAvailable() : true)
                .featured(dto.getFeatured() != null ? dto.getFeatured() : false)
                .unit(dto.getUnit())
                .stock(dto.getStock() != null ? dto.getStock() : 100)
                .category(category)
                .build();
        return toDTO(productRepository.save(product));
    }

    public ProductDTO updateProduct(Long id, ProductDTO dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        if (dto.getName() != null) product.setName(dto.getName());
        if (dto.getDescription() != null) product.setDescription(dto.getDescription());
        if (dto.getPrice() != null) product.setPrice(dto.getPrice());
        if (dto.getImageUrl() != null) product.setImageUrl(dto.getImageUrl());
        if (dto.getAvailable() != null) product.setAvailable(dto.getAvailable());
        if (dto.getFeatured() != null) product.setFeatured(dto.getFeatured());
        if (dto.getUnit() != null) product.setUnit(dto.getUnit());
        if (dto.getStock() != null) product.setStock(dto.getStock());
        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }
        return toDTO(productRepository.save(product));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public ProductDTO toDTO(Product p) {
        return ProductDTO.builder()
                .id(p.getId())
                .name(p.getName())
                .description(p.getDescription())
                .price(p.getPrice())
                .imageUrl(p.getImageUrl())
                .available(p.getAvailable())
                .featured(p.getFeatured())
                .unit(p.getUnit())
                .stock(p.getStock())
                .categoryId(p.getCategory().getId())
                .categoryName(p.getCategory().getName())
                .build();
    }
}
