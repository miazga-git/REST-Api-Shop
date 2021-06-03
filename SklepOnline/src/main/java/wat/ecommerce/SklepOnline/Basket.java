package wat.ecommerce.SklepOnline;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;

import javax.persistence.*;
import java.util.List;
@Data
@Entity
public class Basket {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @ManyToMany
    private List<Item> items;
    private String user;
    private int isPaid = 0;
    private boolean isDeleted = false;
    private String state = "";
    private String city = "";
    private String street = "";
    private String zip = "";
    private String nameAndSurname= "";

    public void addItem(Item item) { this.items.add(item);}

}
/*

package wat.ecommerce.SklepOnline;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;

import javax.persistence.*;
import java.util.List;
@Data
@Entity
public class Basket {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    // to później
    //@OneToOne//klient ma 1 koszyk/koszyk ma 1 klienta
    //private Client client;

    //  @ManyToMany
    //private List<Item> items;
    //private User user;

    // public void addItem(Item item) { this.items.add(item);}
}*/
