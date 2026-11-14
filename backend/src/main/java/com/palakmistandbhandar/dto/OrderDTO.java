package com.palakmistandbhandar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    private Long id;
    private String orderNumber;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Email is required")
    private String customerEmail;

    @NotBlank(message = "Phone number is required")
    private String customerPhone;

    private String deliveryAddress;

    private BigDecimal totalAmount;
    private String status;
    private String notes;
    private LocalDateTime createdAt;
    private List<OrderItemDTO> items;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemDTO {
        private Long productId;
        private String productName;
        private String productImageUrl;
        @NotNull
        @Min(1)
        private Integer quantity;
        private BigDecimal unitPrice;
        private BigDecimal subtotal;
    }
}
