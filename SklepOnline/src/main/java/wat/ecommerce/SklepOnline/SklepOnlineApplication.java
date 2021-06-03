package wat.ecommerce.SklepOnline;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import wat.ecommerce.SklepOnline.Data.ItemRepository;

@SpringBootApplication
public class SklepOnlineApplication {

	public static void main(String[] args) {
		SpringApplication.run(SklepOnlineApplication.class, args);
	}
	@Bean
	public CommandLineRunner dataLoader(ItemRepository repo) {
		return new CommandLineRunner() {
			@Override
			public void run(String... args) throws Exception {
				repo.save(new Item("Pepsi","2l opakowanie",7.99,"https://pngimg.com/uploads/pepsi/pepsi_PNG1.png",1000));
				repo.save(new Item("Coca-cola","2l opakowanie",7.99,"https://www.freeiconspng.com/uploads/bottle-coca-cola-png-transparent-2.png",1000));
				repo.save(new Item("Lays Classic","Duża paczka",4.99,"https://pngimg.com/uploads/potato_chips/potato_chips_PNG79.png",1000));
				repo.save(new Item("Heinz Ketchup","Tomato sauce",2.99,"https://pngimg.com/uploads/ketchup/ketchup_PNG65.png",1000));
				repo.save(new Item("Caprio Juice","Perfect juice",2.49,"https://delidostawa.pl/1265-large_default/napoj-caprio-pomaranczowy-2-l.jpg",1000));
				repo.save(new Item("diCAPRIO Juice","Perfect juice",2.49,"https://pngimg.com/uploads/leonardo_dicaprio/leonardo_dicaprio_PNG44.png",2));
				System.out.println(repo.findAll());
			}
		};
	}
}
