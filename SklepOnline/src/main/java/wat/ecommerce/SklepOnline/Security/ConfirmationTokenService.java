package wat.ecommerce.SklepOnline.Security;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import wat.ecommerce.SklepOnline.Data.ConfirmationTokenRepository;

@Service
@AllArgsConstructor
public class ConfirmationTokenService {

    private final ConfirmationTokenRepository confirmationTokenRepository;

    void saveConfirmationToken(ConfirmationToken confirmationToken) {

        confirmationTokenRepository.save(confirmationToken);
    }
}