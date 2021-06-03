package wat.ecommerce.SklepOnline.Data;

import org.springframework.data.repository.CrudRepository;
import wat.ecommerce.SklepOnline.Basket;

public interface BasketRepository extends CrudRepository<Basket,Long> {
}
