package matchTeam.crewcrew.controller;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.response.exception.auth.CAccessDeniedException;
import matchTeam.crewcrew.response.exception.auth.CAuthenticationEntryPointException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/exception")
public class ExceptionController {
    @GetMapping("/entrypoint")
    public ResponseEntity<Object> entrypointException(){
        throw new CAuthenticationEntryPointException();
    }
    @GetMapping("/accessDenied")
    public ResponseEntity<Object> accessDeniedException(){
        throw new CAccessDeniedException();
    }
}
