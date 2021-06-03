package wat.ecommerce.SklepOnline;

import org.junit.experimental.theories.DataPoints;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

import static javax.persistence.InheritanceType.JOINED;

@Data
@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double price;
    private String name;
    private String description;
    private int quantity;
    private String url;

    public Item(String name, String description, Double price) {
        this.price = price;
        this.name = name;
        this.description = description;
        this.quantity = 0;
    }

    public Item(String name, String description, Double price, String url) {
        this.price = price;
        this.name = name;
        this.description = description;
        this.url = url;
        this.quantity = 0;
    }

    public Item(String name, String description, Double price, int quantity) {
        this.price = price;
        this.name = name;
        this.description = description;
        this.url = null;
        this.quantity = quantity;
    }

    public Item() {
        this.quantity = 0;
    }

    public Item(String name, String description, Double price, String url, int quantity) {
        this.price = price;
        this.name = name;
        this.description = description;
        this.url = url;
        this.quantity = quantity;
    }
}