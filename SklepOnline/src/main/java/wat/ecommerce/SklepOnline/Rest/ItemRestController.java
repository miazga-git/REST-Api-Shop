package wat.ecommerce.SklepOnline.Rest;

import org.springframework.web.bind.annotation.*;
import wat.ecommerce.SklepOnline.Basket;
import wat.ecommerce.SklepOnline.Data.ItemRepository;
import wat.ecommerce.SklepOnline.Item;

import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = "*")
//@RequestMapping("/")
@RestController
public class ItemRestController {

    private final ItemRepository itemRepository;

    public ItemRestController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @GetMapping("/api/iteminfo")
    List<Item> findAllItems(){
        List<Item> items = new ArrayList<>();
        itemRepository.findAll().forEach(items::add);
        return items;
    }

    @GetMapping("/api/test")
    String findAllBaskets(){
        return "Amazing Store";
    }

    @PostMapping("/iteminfo")
    Item newItem(@RequestBody Item newItem) {
       // Quantity quantity = new Quantity(newItem,0);
        //quantityRepository.save(quantity);
        //newItem.setQuantity(quantity);
    return itemRepository.save(newItem);}
}
