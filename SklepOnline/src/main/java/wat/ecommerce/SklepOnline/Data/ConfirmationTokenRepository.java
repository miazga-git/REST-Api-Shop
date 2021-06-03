package wat.ecommerce.SklepOnline.Data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import wat.ecommerce.SklepOnline.Security.ConfirmationToken;

@Repository
public interface ConfirmationTokenRepository extends CrudRepository<ConfirmationToken, Long> {

}