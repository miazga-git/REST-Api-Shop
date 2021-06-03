package wat.ecommerce.SklepOnline.Rest;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import wat.ecommerce.SklepOnline.Data.UserRepository;
import wat.ecommerce.SklepOnline.Item;
import wat.ecommerce.SklepOnline.Security.UserRepositoryUserDetailsService;
import wat.ecommerce.SklepOnline.User;

import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
public class UserRestController {
    private final UserRepository userRepository;
    private final UserRepositoryUserDetailsService userRepositoryUserDetailsService;

    public UserRestController(UserRepository userRepository, UserRepositoryUserDetailsService userRepositoryUserDetailsService){//, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
       // this.passwordEncoder = passwordEncoder;
        this.userRepositoryUserDetailsService = userRepositoryUserDetailsService;
    }

    @GetMapping("/api/checkuser")
    String findUser(){
        return "You're verified";
    }

    @PostMapping("/api/adduser")
    void addNewUser(@RequestBody User user){
        //ser us = new User(user.getUsername(), passwordEncoder.encode(user.getPassword()));
        //return userRepository.save(user);
        userRepositoryUserDetailsService.signUpUser(user);
    }
}
