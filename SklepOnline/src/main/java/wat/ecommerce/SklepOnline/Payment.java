package wat.ecommerce.SklepOnline;

import lombok.Data;
import lombok.Generated;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(cascade = CascadeType.PERSIST)
    private Basket basket;
    private LocalDateTime date;

    public Payment(Basket basket) {
        this.basket = basket;
        this.date = LocalDateTime.now();
    }
    public Payment(){this.date = LocalDateTime.now();}
}
