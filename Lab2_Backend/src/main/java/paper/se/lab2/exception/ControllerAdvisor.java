package paper.se.lab2.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

/**
 * You can handle all of your exceptions here.
 *
 * @author LBW
 */
@ControllerAdvice
public class ControllerAdvisor extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        Map<String, Integer> response = new HashMap<>();
        //response.put("message", ex.getMessage());
        response.put("code",404);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(UNHasBeenRegisteredException.class)
    public ResponseEntity<?> handlerUsernameHasBeenRegisteredException(UNHasBeenRegisteredException ex) {
        Map<String, Integer> response = new HashMap<>();
        //response.put("message", ex.getMessage());
        response.put("code",400);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> handleBadCredentialsException(BadCredentialsException ex) {
        Map<String, Integer> response = new HashMap<>();
        response.put("code",403);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ExceptionHandler(ConferHasBeenRegisteredException.class)
    public ResponseEntity<?> handleConferHasBeenRegisteredException(ConferHasBeenRegisteredException ex) {
        Map<String, Integer> response = new HashMap<>();
        response.put("code", 400);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
