package org.example.eshopbackend.server.api.items;

import org.example.eshopbackend.database.entity.Item;
import org.example.eshopbackend.database.repository.ItemRepository;
import org.example.eshopbackend.azure.AzureBlobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service("itemService")
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private AzureBlobService azureBlobService;

    public List<Item> getItemList(){
        List<Item> itemList;
        itemList = itemRepository.findAllByOrderByIdAsc();
        return itemList;
    }

    public Item getItemById(Long id) throws Exception {
        Optional<Item> itemOpt = itemRepository.findById(id);
        if (itemOpt.isPresent()) {
            return itemOpt.get();
        }
        throw new Exception("Item Not Found");
    }

    public void updateQuantities(List<Item> cartItems){
        for (Item cartItem : cartItems) {
            Optional<Item> itemOpt = itemRepository.findById(cartItem.getId());
            if (itemOpt.isPresent()) {
                Item item = itemOpt.get();
                item.setQuantity(item.getQuantity() - cartItem.getQuantity());
                itemRepository.save(item);
            }
        }
    }

    public void saveItem(Item item) {
        itemRepository.save(item);
    }

    public Item updateItem(Item newItem, Long id) throws Exception {
        Optional<Item> itemOpt = itemRepository.findById(id);
        if (itemOpt.isPresent()) {
            return itemRepository.save(newItem);
        }
        throw new Exception("Item Not Found");
    }

    public Item updateItemWithImage(Long id, String name, String description, double price, int quantity, MultipartFile image) throws Exception {
        Optional<Item> itemOpt = itemRepository.findById(id);
        if (itemOpt.isPresent()) {
            Item item = itemOpt.get();

            item.setName(name);
            item.setDescription(description);
            item.setPrice(price);
            item.setQuantity(quantity);

            if (image != null && !image.isEmpty()) {
                String imageUrl = azureBlobService.uploadImage(image, image.getOriginalFilename());
                item.setImage(imageUrl);
            }

            return itemRepository.save(item);
        }
        throw new Exception("Item Not Found");
    }
}
