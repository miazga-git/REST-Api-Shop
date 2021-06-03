package wat.ecommerce.SklepOnline.Data;

import org.springframework.data.repository.CrudRepository;
import wat.ecommerce.SklepOnline.Item;

public interface ItemRepository extends CrudRepository<Item,Long> {
}
