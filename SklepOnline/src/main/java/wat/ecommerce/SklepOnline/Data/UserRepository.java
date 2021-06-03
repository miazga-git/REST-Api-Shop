package wat.ecommerce.SklepOnline.Data;

import org.springframework.data.repository.CrudRepository;
import wat.ecommerce.SklepOnline.User;

public interface UserRepository extends CrudRepository<User,Long> {
    User findByUsername(String username);
}
