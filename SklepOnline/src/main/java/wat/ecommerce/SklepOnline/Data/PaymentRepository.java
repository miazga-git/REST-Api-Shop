package wat.ecommerce.SklepOnline.Data;

import org.springframework.data.repository.CrudRepository;
import wat.ecommerce.SklepOnline.Payment;

public interface PaymentRepository extends CrudRepository<Payment,Long> {
}
