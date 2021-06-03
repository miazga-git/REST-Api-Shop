package wat.ecommerce.SklepOnline.Rest;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.standard.expression.EqualsNotEqualsExpression;
import wat.ecommerce.SklepOnline.Basket;
import wat.ecommerce.SklepOnline.Data.BasketRepository;
import wat.ecommerce.SklepOnline.Data.DetailsRepository;
import wat.ecommerce.SklepOnline.Data.ItemRepository;
import wat.ecommerce.SklepOnline.Details;
import wat.ecommerce.SklepOnline.Item;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "*")
@RestController
public class BasketRestController {
    private final BasketRepository basketRepository;
    private final ItemRepository itemRepository;
    private final DetailsRepository detailsRepository;

    public BasketRestController(BasketRepository basketRepository, ItemRepository itemRepository, DetailsRepository detailsRepository) {
        this.basketRepository = basketRepository;
        this.itemRepository = itemRepository;
        this.detailsRepository = detailsRepository;
    }

    @GetMapping("/basketinfo")
    List<Basket> findAllBaskets(){
        List<Basket> baskets = new ArrayList<>();
        basketRepository.findAll().forEach(baskets::add);
        return baskets;
    }

    @PostMapping("/api/basketfromfront")
    Basket newBasketFromFrontend(@RequestBody Basket newBasket) {
        List<Item> newItems = new ArrayList<>();
        newItems = newBasket.getItems(); // tutaj sa przedmioty wybrane przez uzytkownika np. [id:1, nazwa:Pepsi, quantity:3]
        int quantity;
        List<Details> details = new ArrayList<>();

        for (int i = 0; i < newItems.size(); i++) { //lece po kazdym elemencie petli
            quantity = newItems.get(i).getQuantity(); // tutaj zapisuje pomocniczo quantity przeslane [id:1, nazwa:Pepsi, quantity:3] czyli 3
            if (quantity >  itemRepository
                    .findById(newItems.get(i).getId()) // szukam po id oryginalnego cyzli [id:1, nazwa:Pepsi, quantity:1000]
                    .get().getQuantity()) {
                throw new ResourceNotFoundException("Not enough items.left");
            }
            newItems.get(i).setQuantity( //biore sobie przedmiot z koszyka [id:1, nazwa:Pepsi, quantity:3]
                    itemRepository
                            .findById(newItems.get(i).getId()) // szukam po id oryginalnego cyzli [id:1, nazwa:Pepsi, quantity:1000]
                            .get().getQuantity() - quantity); // ustawiam w przeslanym obiekcie quantity jako roznica czyli [id:1, nazwa:Pepsi, quantity:1000-3=997]

            details.add(new Details(newBasket,newItems.get(i),quantity));//dodaje jako detale koszyka [obiekt koszyk, obiekt przedmiot - [id:1, nazwa:Pepsi, quantity:1000-3=997] oraz quantity ile kupil klient, czyli 3]
        }
        for (Details detail:details)//zapisuje wszystko
            detailsRepository.save(detail);
        for (Item updatedItem:newItems)
            itemRepository.save(updatedItem);//tutaj aktualizuje sie quntity, bo nie zmienilem nigdzie ID wiec zmienia sie tylko quantity, nie dodaje sie nowy obiekt
        return basketRepository.save(newBasket);
        }

    @PostMapping("/api/basketinfo")
    Basket newBasket(@RequestBody Basket newBasket) {
        List<Item> newItems = new ArrayList<>();
        newItems = newBasket.getItems();
        System.out.println(newBasket);
        System.out.println(itemRepository.findAll());
        int quantity;
        for (int i = 0; i < newItems.size(); i++) {
            quantity = newItems.get(i).getQuantity();
            newItems.set(i, findByName(newItems.get(i).getName()));
            newItems.get(i).setQuantity(quantity);
        }

        newBasket.setItems(newItems);
        return basketRepository.save(newBasket);
    }


    @GetMapping("/api/getalluserscarts/{user}")
    List<Details> newBasketUser(@PathVariable String user) {
        List<Basket> baskets = findBasketsByUsername(user);
        List<Details> details = new ArrayList<>();
        for (Basket basket:baskets) {
            findDetailsById(basket.getId()).forEach(detail -> details.add(detail));
        }
        /*System.out.println(details);
        for (Basket basket:baskets)
        {
            for (Item item:basket.getItems())
            {
                for (Details detail:details)
                if (item.getId().equals(detail.getItem().getId())
                        && detail.getBasket().getId().equals(basket.getId())) {
                    item.setQuantity(detail.getQuantity());
                }
            }
        }*/
        return details;
    }
    private Item findByName(String name)
    {
        for (Item item:itemRepository.findAll())
        {
            if (item.getName().toUpperCase().equals(name.toUpperCase())) {
                return item;
            }
        }
        return null;
    }

    @GetMapping("/api/getdetails/{id}")
    List<Details> getDetails(@PathVariable Long id) {
        return findDetailsById(id);
    }

    @PutMapping("/api/payfororder/{id}/{token}/{state}/{city}/{street}/{zip}/{nameAndSurname}")
    Basket payForOrder(@PathVariable Long id, @PathVariable int token, @PathVariable String state, @PathVariable String city, @PathVariable String street,@PathVariable String zip, @PathVariable String nameAndSurname) {
        Optional<Basket> basket = basketRepository.findById(id);
        basket.get().setIsPaid(token);
        basket.get().setState(state);
        basket.get().setCity(city);
        basket.get().setStreet(street);
        basket.get().setZip(zip);
        basket.get().setNameAndSurname(nameAndSurname);
        return basketRepository.save(basket.get());
    }
    @GetMapping("/api/deleteorder/{id}")
    Basket deleteOrder(@PathVariable Long id) {
        Optional<Basket> basket = basketRepository.findById(id);
        basket.get().setDeleted(true);
        List<Details> details = new ArrayList<>();
        int quantity;
        Item item;
        findDetailsById(basket.get().getId()).forEach(detail -> details.add(detail));
        for (Details detail:details){
            item = itemRepository.findById(detail.getItem().getId()).get();
            item.setQuantity(item.getQuantity() + detail.getQuantity());
            itemRepository.save(item);
        }
        return basketRepository.save(basket.get());
    }


    private List<Details> findDetailsById(Long id)
    {
        List<Details> details = new ArrayList<Details>();
        detailsRepository.findAll().forEach(detail -> {
            if (detail.getBasket().getId().equals(id))
                details.add(detail);
        });
        return details;
    }
    private List<Basket> findBasketsByUsername(String name)
    {
        List<Basket> baskets = new ArrayList<Basket>();
        basketRepository.findAll().forEach(basket -> {
            if (basket.getUser().equals(name))
                baskets.add(basket);
        });
        return baskets;
    }
}


