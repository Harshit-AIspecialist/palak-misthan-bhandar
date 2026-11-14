package com.palakmistandbhandar.repository;

import com.palakmistandbhandar.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategoryId(Long categoryId);

    List<Product> findByAvailableTrueOrderByNameAsc();

    List<Product> findByFeaturedTrueAndAvailableTrue();

    @Query("SELECT p FROM Product p WHERE p.available = true AND " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Product> searchProducts(@Param("query") String query);

    @Query("SELECT p FROM Product p WHERE p.available = true AND p.category.id = :categoryId ORDER BY p.name ASC")
    List<Product> findAvailableByCategory(@Param("categoryId") Long categoryId);
}
