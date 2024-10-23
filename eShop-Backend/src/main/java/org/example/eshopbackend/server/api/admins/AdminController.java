package org.example.eshopbackend.server.api.admins;

import org.example.eshopbackend.database.entity.Item;
import org.example.eshopbackend.azure.AzureBlobService;
import org.example.eshopbackend.server.api.items.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private ItemService itemService;

    @Autowired
    private AzureBlobService azureBlobService;

    @Autowired
    private AdminService adminService;

    @PostMapping("/addItem")
    public ResponseEntity<String> addItem(@RequestParam("name") String name,
                                          @RequestParam("description") String description,
                                          @RequestParam("price") double price,
                                          @RequestParam("quantity") int quantity,
                                          @RequestParam("image") MultipartFile image) {
        String blobName = image.getOriginalFilename();
        try {
            String imageUrl = azureBlobService.uploadImage(image, blobName);

            Item newItem = new Item(name, description, price, quantity, imageUrl);
            itemService.saveItem(newItem);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            try {
                azureBlobService.deleteFile(blobName); //delete the file if db upload failed
            } catch (Exception ex) {
                e.printStackTrace();
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add item");
        }
    }

    // Update item
    @PutMapping("updateItemWithImage/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id,
                                           @RequestParam("name") String name,
                                           @RequestParam("description") String description,
                                           @RequestParam("price") double price,
                                           @RequestParam("quantity") int quantity,
                                           @RequestParam("image") MultipartFile image) {
        try {
            Item updatedItem = itemService.updateItemWithImage(id, name, description, price, quantity, image);
            return ResponseEntity.ok(updatedItem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("updateItem/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id,
                                           @RequestBody Item item) {
        try {
            Item updatedItem = itemService.updateItem(item, id);
            return ResponseEntity.ok(updatedItem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/statistics")
    public ResponseEntity<StatisticsDTO> getStatistics() {
        try {
            StatisticsDTO statistics = adminService.getStatistics();
            return ResponseEntity.ok(statistics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
