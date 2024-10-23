package org.example.eshopbackend.server.api.orders;

import org.example.eshopbackend.database.entity.Item;
import org.example.eshopbackend.database.entity.Order;
import org.example.eshopbackend.database.entity.OrderItem;
import org.example.eshopbackend.database.repository.ItemRepository;
import org.example.eshopbackend.database.repository.OrderItemRepository;
import org.example.eshopbackend.database.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("orderService")
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private ItemRepository itemRepository;

    public String confirmOrder(OrderDTO newOrder) {
        Order order = new Order(newOrder.getUserId(), newOrder.getOrderDate());

        try{
            order = orderRepository.save(order);
        }catch(Exception e){
            return "Order confirmation failed with error: " + e.getMessage();
        }

        for (OrderItemDTO orderItemDTO : newOrder.getItems()) {
            try{
                OrderItem orderItem = new OrderItem(order.getId(), orderItemDTO.getItemId(), orderItemDTO.getQuantity());

                Optional<Item> itemOpt = itemRepository.findById(orderItemDTO.getItemId());
                if (itemOpt.isEmpty()) {
                    throw new Exception("Item not found: " + orderItemDTO.getItemId());
                }

                orderItemRepository.save(orderItem);
            }catch (Exception e){
                orderRepository.delete(order);
                return "Order confirmation failed with error: " + e.getMessage();
            }
        }
        return "Order confirmation successful";
    }

    public List<OrderDTO> getOrderHistory(Long userId) {
        List<Order> orders = orderRepository.findByUserIdOrderByDatetimeDesc(userId);
        List<OrderDTO> orderDTOs = new ArrayList<>();

        for (Order order : orders) {
            OrderDTO orderDTO = new OrderDTO();
            orderDTO.setOrderId(order.getId());
            orderDTO.setOrderDate(order.getDatetime().toInstant(ZoneOffset.MIN)
                    .atZone(ZoneId.systemDefault()).toLocalDateTime());

            List<OrderItem> orderItems = orderItemRepository.findByOrderId(order.getId());
            List<OrderItemDTO> orderItemDTOS = new ArrayList<>();
            double totalCost = 0.0;

            for (OrderItem orderItem : orderItems) {
                OrderItemDTO orderItemDTO = new OrderItemDTO();
                orderItemDTO.setItemId(orderItem.getItemId());
                orderItemDTO.setQuantity(orderItem.getQuantity());

                Optional<Item> itemOpt = itemRepository.findById(orderItem.getItemId());
                if (itemOpt.isPresent()) {
                    Item item = itemOpt.get();
                    orderItemDTO.setItemName(item.getName());
                    orderItemDTO.setPrice(item.getPrice());

                    totalCost += orderItemDTO.getPrice() * orderItemDTO.getQuantity();
                    orderItemDTOS.add(orderItemDTO);
                }
            }

            orderDTO.setItems(orderItemDTOS);
            orderDTO.setTotalOrderCost(totalCost);
            orderDTOs.add(orderDTO);
        }
        return orderDTOs;
    }
}
