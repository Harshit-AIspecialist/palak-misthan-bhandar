package com.palakmistandbhandar.service;

import com.palakmistandbhandar.dto.OrderDTO;
import com.palakmistandbhandar.model.Order;
import com.palakmistandbhandar.model.OrderItem;
import com.palakmistandbhandar.model.Product;
import com.palakmistandbhandar.repository.OrderRepository;
import com.palakmistandbhandar.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Transactional
    public OrderDTO createOrder(OrderDTO dto) {
        String orderNumber = generateOrderNumber();

        Order order = Order.builder()
                .orderNumber(orderNumber)
                .customerName(dto.getCustomerName())
                .customerEmail(dto.getCustomerEmail())
                .customerPhone(dto.getCustomerPhone())
                .deliveryAddress(dto.getDeliveryAddress())
                .notes(dto.getNotes())
                .status(Order.OrderStatus.PENDING)
                .build();

        List<OrderItem> items = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (OrderDTO.OrderItemDTO itemDto : dto.getItems()) {
            Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + itemDto.getProductId()));

            BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(itemDto.getQuantity()));
            total = total.add(subtotal);

            OrderItem item = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemDto.getQuantity())
                    .unitPrice(product.getPrice())
                    .subtotal(subtotal)
                    .build();
            items.add(item);
        }

        order.setTotalAmount(total);
        order.setItems(items);
        Order saved = orderRepository.save(order);

        return toDTO(saved);
    }

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc()
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public OrderDTO getOrderById(Long id) {
        return orderRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

    public OrderDTO getOrderByNumber(String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderNumber));
    }

    public OrderDTO updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        order.setStatus(Order.OrderStatus.valueOf(status.toUpperCase()));
        return toDTO(orderRepository.save(order));
    }

    private String generateOrderNumber() {
        return "PMB-" + System.currentTimeMillis() + "-" + (new Random().nextInt(900) + 100);
    }

    private OrderDTO toDTO(Order o) {
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        List<OrderDTO.OrderItemDTO> items = o.getItems() == null ? List.of() :
                o.getItems().stream().map(item -> OrderDTO.OrderItemDTO.builder()
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .productImageUrl(item.getProduct().getImageUrl())
                        .quantity(item.getQuantity())
                        .unitPrice(item.getUnitPrice())
                        .subtotal(item.getSubtotal())
                        .build()).collect(Collectors.toList());

        return OrderDTO.builder()
                .id(o.getId())
                .orderNumber(o.getOrderNumber())
                .customerName(o.getCustomerName())
                .customerEmail(o.getCustomerEmail())
                .customerPhone(o.getCustomerPhone())
                .deliveryAddress(o.getDeliveryAddress())
                .totalAmount(o.getTotalAmount())
                .status(o.getStatus().name())
                .notes(o.getNotes())
                .createdAt(o.getCreatedAt())
                .items(items)
                .build();
    }
}
