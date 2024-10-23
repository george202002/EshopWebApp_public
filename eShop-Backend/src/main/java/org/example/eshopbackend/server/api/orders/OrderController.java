package org.example.eshopbackend.server.api.orders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/confirm")
    public ResponseEntity<String> confirmOrder(@RequestBody OrderDTO newOrder) {
        ResponseEntity<String> responseEntity;
        try {
            String result = orderService.confirmOrder(newOrder);
            responseEntity = status(HttpStatus.OK).body(result);
        } catch (Exception e) {
            responseEntity = status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
        return responseEntity;
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<OrderDTO>> getOrderHistory(@PathVariable Long userId){
        ResponseEntity<List<OrderDTO>> responseEntity;
        try {
            List<OrderDTO> orderHistory = orderService.getOrderHistory(userId);
            responseEntity = status(HttpStatus.OK).body(orderHistory);
        } catch (Exception e) {
            responseEntity = status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        return responseEntity;
    }

}
