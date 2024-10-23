package org.example.eshopbackend.server.api.admins;

import org.example.eshopbackend.database.entity.Item;
import org.example.eshopbackend.database.entity.OrderItem;
import org.example.eshopbackend.database.entity.Order;
import org.example.eshopbackend.database.entity.User;
import org.example.eshopbackend.database.repository.ItemRepository;
import org.example.eshopbackend.database.repository.OrderItemRepository;
import org.example.eshopbackend.database.repository.OrderRepository;
import org.example.eshopbackend.database.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service("adminService")
public class AdminService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    public StatisticsDTO getStatistics() {
        long totalOrders = orderRepository.count();
        double totalRevenue = orderItemRepository.findAll().stream()
                .mapToDouble(item -> item.getQuantity() * itemRepository.findById(item.getItemId()).get().getPrice())
                .sum();

        // Find the most sold product
        Map<Long, Integer> itemSalesCount = new HashMap<>();
        for (OrderItem orderItem : orderItemRepository.findAll()) {
            itemSalesCount.put(orderItem.getItemId(),
                    itemSalesCount.getOrDefault(orderItem.getItemId(), 0) + orderItem.getQuantity());
        }
        Long mostSoldItemId = Collections.max(itemSalesCount.entrySet(), Map.Entry.comparingByValue()).getKey();
        Item mostSoldProduct = itemRepository.findById(mostSoldItemId).get();

        // Find top customer
        Map<Long, Long> userOrderCount = orderRepository.findAll().stream()
                .collect(Collectors.groupingBy(Order::getUserId, Collectors.counting()));
        Long topCustomerId = Collections.max(userOrderCount.entrySet(), Map.Entry.comparingByValue()).getKey();
        User topCustomer = userRepository.findById(topCustomerId).get();

        return new StatisticsDTO(totalOrders, totalRevenue,
                new ProductDTO(mostSoldProduct.getName(), itemSalesCount.get(mostSoldItemId)),
                new CustomerDTO(topCustomer.getName(), userOrderCount.get(topCustomerId)));
    }
}
