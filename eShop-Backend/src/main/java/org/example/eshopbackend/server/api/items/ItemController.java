package org.example.eshopbackend.server.api.items;

import org.example.eshopbackend.database.entity.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @GetMapping("")
    public ResponseEntity<List<Item>> getItemList(){
        ResponseEntity<List<Item>> responseEntity;
        try {
            List<Item> itemList = itemService.getItemList();
            responseEntity = status(HttpStatus.OK).body(itemList);
        } catch (Exception e) {
            responseEntity = status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        return responseEntity;
    }

    @PostMapping("/update-quantities")
    public ResponseEntity<Void> updateQuantities(@RequestBody List<Item> cartItems) {
        ResponseEntity<Void> responseEntity;
        try{
            itemService.updateQuantities(cartItems);
            responseEntity = status(HttpStatus.OK).body(null);
        }catch (Exception e) {
            responseEntity = status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        return responseEntity;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id){
        ResponseEntity<Item> responseEntity;
        try {
            Item item = itemService.getItemById(id);
            responseEntity = status(HttpStatus.OK).body(item);
        } catch (Exception e) {
            responseEntity = status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        return responseEntity;
    }
}
