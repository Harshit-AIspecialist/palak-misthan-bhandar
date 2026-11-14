package com.palakmistandbhandar.config;

import com.palakmistandbhandar.model.AppUser;
import com.palakmistandbhandar.model.Category;
import com.palakmistandbhandar.model.Product;
import com.palakmistandbhandar.repository.AppUserRepository;
import com.palakmistandbhandar.repository.CategoryRepository;
import com.palakmistandbhandar.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedUsers();
        seedCategories();
        seedProducts();
        log.info("✅ Data seeding completed for Palak Mistan Bhandar!");
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            AppUser admin = AppUser.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .role("ADMIN")
                    .fullName("Shishpal Kumawat")
                    .build();
            userRepository.save(admin);
            log.info("Admin user created: admin / admin123");
        }
    }

    private void seedCategories() {
        if (categoryRepository.count() == 0) {
            Category sweets = categoryRepository.save(Category.builder()
                    .name("Indian Sweets")
                    .description("Traditional Indian mithai - ladoo, barfi, halwa and more")
                    .imageUrl("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400")
                    .displayOrder(1).active(true).build());

            Category snacks = categoryRepository.save(Category.builder()
                    .name("Snacks & Namkeen")
                    .description("Crispy kachori, samosa, bhujia and savory snacks")
                    .imageUrl("https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400")
                    .displayOrder(2).active(true).build());

            Category dairy = categoryRepository.save(Category.builder()
                    .name("Dairy Products")
                    .description("Fresh mawa, paneer, khoya and dairy delights")
                    .imageUrl("https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400")
                    .displayOrder(3).active(true).build());

            Category beverages = categoryRepository.save(Category.builder()
                    .name("Beverages & Juices")
                    .description("Fresh juices, shakes, lassi and cold drinks")
                    .imageUrl("https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400")
                    .displayOrder(4).active(true).build());

            seedProductsForCategories(sweets, snacks, dairy, beverages);
        }
    }

    private void seedCategories_placeholder() {}

    private void seedProducts() {
        // Products are seeded inside seedProductsForCategories
    }

    private void seedProductsForCategories(Category sweets, Category snacks, Category dairy, Category beverages) {
        // ---- SWEETS ----
        productRepository.save(Product.builder()
                .name("Motichoor Ladoo").category(sweets)
                .description("Soft and melt-in-mouth besan ladoos made with pure ghee")
                .price(new BigDecimal("350.00")).unit("per kg").featured(true).stock(50)
                .imageUrl("https://images.unsplash.com/photo-1593967037752-30cf86bcfb67?w=400").build());

        productRepository.save(Product.builder()
                .name("Kaju Katli").category(sweets)
                .description("Premium cashew fudge with silver vark, a classic Indian sweet")
                .price(new BigDecimal("800.00")).unit("per kg").featured(true).stock(30)
                .imageUrl("https://images.unsplash.com/photo-1627462788935-8e1065b48f17?w=400").build());

        productRepository.save(Product.builder()
                .name("Besan Barfi").category(sweets)
                .description("Rich and aromatic chickpea flour burfi with cardamom")
                .price(new BigDecimal("400.00")).unit("per kg").featured(false).stock(40)
                .imageUrl("https://images.unsplash.com/photo-1536304993881-ff86e7b3b2f2?w=400").build());

        productRepository.save(Product.builder()
                .name("Gajar Ka Halwa").category(sweets)
                .description("Winter special carrot halwa cooked in pure milk and ghee")
                .price(new BigDecimal("300.00")).unit("per kg").featured(true).stock(20)
                .imageUrl("https://images.unsplash.com/photo-1562517916-9f68de83e5c8?w=400").build());

        productRepository.save(Product.builder()
                .name("Gulab Jamun").category(sweets)
                .description("Soft khoya dumplings soaked in rose-flavored sugar syrup")
                .price(new BigDecimal("280.00")).unit("per kg").featured(false).stock(60)
                .imageUrl("https://images.unsplash.com/photo-1627734433731-621a83f4c56b?w=400").build());

        productRepository.save(Product.builder()
                .name("Rasgulla").category(sweets)
                .description("Soft and spongy chhena balls in light sugar syrup")
                .price(new BigDecimal("250.00")).unit("per kg").featured(false).stock(50)
                .imageUrl("https://images.unsplash.com/photo-1562517916-9f68de83e5c8?w=400").build());

        productRepository.save(Product.builder()
                .name("Jalebi").category(sweets)
                .description("Crispy fermented batter swirls dipped in saffron syrup")
                .price(new BigDecimal("200.00")).unit("per kg").featured(true).stock(70)
                .imageUrl("https://images.unsplash.com/photo-1573816316900-c0bdb5a7f3e3?w=400").build());

        productRepository.save(Product.builder()
                .name("Mohanthal").category(sweets)
                .description("Traditional Rajasthani gram flour sweet with dry fruits")
                .price(new BigDecimal("450.00")).unit("per kg").featured(false).stock(25)
                .imageUrl("https://images.unsplash.com/photo-1536304993881-ff86e7b3b2f2?w=400").build());

        // ---- SNACKS ----
        productRepository.save(Product.builder()
                .name("Pyaaz Kachori").category(snacks)
                .description("Crispy Jaipur-style kachori stuffed with spiced onion filling")
                .price(new BigDecimal("20.00")).unit("per piece").featured(true).stock(100)
                .imageUrl("https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400").build());

        productRepository.save(Product.builder()
                .name("Aloo Samosa").category(snacks)
                .description("Classic triangular pastry filled with spiced potato and peas")
                .price(new BigDecimal("15.00")).unit("per piece").featured(true).stock(150)
                .imageUrl("https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400").build());

        productRepository.save(Product.builder()
                .name("Dal Kachori").category(snacks)
                .description("Flaky pastry stuffed with spiced moong dal, Rajasthani specialty")
                .price(new BigDecimal("25.00")).unit("per piece").featured(false).stock(80)
                .imageUrl("https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400").build());

        productRepository.save(Product.builder()
                .name("Bhujia Namkeen").category(snacks)
                .description("Crispy and spicy Rajasthani bhujia, a household favorite")
                .price(new BigDecimal("180.00")).unit("per kg").featured(false).stock(60)
                .imageUrl("https://images.unsplash.com/photo-1620748261788-d59e1f671d49?w=400").build());

        productRepository.save(Product.builder()
                .name("Mathri").category(snacks)
                .description("Flaky and crispy Rajasthani crackers perfect with tea")
                .price(new BigDecimal("220.00")).unit("per kg").featured(false).stock(45)
                .imageUrl("https://images.unsplash.com/photo-1620748261788-d59e1f671d49?w=400").build());

        productRepository.save(Product.builder()
                .name("Chakki Namkeen").category(snacks)
                .description("Spiced flour chips — crispy, light and irresistible")
                .price(new BigDecimal("160.00")).unit("per kg").featured(false).stock(55)
                .imageUrl("https://images.unsplash.com/photo-1620748261788-d59e1f671d49?w=400").build());

        // ---- DAIRY ----
        productRepository.save(Product.builder()
                .name("Fresh Paneer").category(dairy)
                .description("Soft homestyle cottage cheese, made fresh daily from pure milk")
                .price(new BigDecimal("350.00")).unit("per kg").featured(true).stock(30)
                .imageUrl("https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400").build());

        productRepository.save(Product.builder()
                .name("Mawa / Khoya").category(dairy)
                .description("Rich milk solids used in traditional Indian sweets")
                .price(new BigDecimal("420.00")).unit("per kg").featured(true).stock(25)
                .imageUrl("https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400").build());

        productRepository.save(Product.builder()
                .name("Desi Ghee").category(dairy)
                .description("Pure cow ghee, bilona method, rich aroma and golden color")
                .price(new BigDecimal("650.00")).unit("per 500g").featured(false).stock(20)
                .imageUrl("https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400").build());

        productRepository.save(Product.builder()
                .name("Malai Paneer").category(dairy)
                .description("Extra creamy paneer with high fat content, perfect for curries")
                .price(new BigDecimal("400.00")).unit("per kg").featured(false).stock(20)
                .imageUrl("https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400").build());

        // ---- BEVERAGES ----
        productRepository.save(Product.builder()
                .name("Mango Shake").category(beverages)
                .description("Thick and creamy Alphonso mango shake with chilled milk")
                .price(new BigDecimal("80.00")).unit("per glass").featured(true).stock(200)
                .imageUrl("https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400").build());

        productRepository.save(Product.builder()
                .name("Sweet Lassi").category(beverages)
                .description("Refreshing chilled yogurt drink with rose and cardamom")
                .price(new BigDecimal("50.00")).unit("per glass").featured(true).stock(200)
                .imageUrl("https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400").build());

        productRepository.save(Product.builder()
                .name("Fresh Orange Juice").category(beverages)
                .description("100% fresh-squeezed orange juice, no additives")
                .price(new BigDecimal("60.00")).unit("per glass").featured(false).stock(150)
                .imageUrl("https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400").build());

        productRepository.save(Product.builder()
                .name("Rose Sharbat").category(beverages)
                .description("Chilled rose petal drink with fresh lime, a summer favorite")
                .price(new BigDecimal("40.00")).unit("per glass").featured(false).stock(180)
                .imageUrl("https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400").build());

        productRepository.save(Product.builder()
                .name("Strawberry Shake").category(beverages)
                .description("Fresh strawberry blended with chilled milk and ice cream")
                .price(new BigDecimal("90.00")).unit("per glass").featured(false).stock(120)
                .imageUrl("https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400").build());

        log.info("Seeded {} products", productRepository.count());
    }
}
