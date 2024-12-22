package auth_service.controller;

import auth_service.dto.LoginRequest;
import auth_service.dto.SignUpRequest;
import auth_service.dto.TokenDto;
import auth_service.dto.TokenValidationRequest;
import auth_service.dto.ErrorResponse;
import auth_service.exception.JwtAuthenticationException;
import auth_service.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  @PostMapping("/signup")
  public ResponseEntity<Void> signup(@Valid @RequestBody SignUpRequest request) {
    authService.signup(request);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/login")
  public ResponseEntity<TokenDto> login(@Valid @RequestBody LoginRequest request) {
    TokenDto tokenDto = authService.login(request);
    return ResponseEntity.ok(tokenDto);
  }

  @PostMapping("/validate")
  public ResponseEntity<Boolean> validateToken(@RequestBody TokenValidationRequest request) {
    boolean isValid = authService.validateToken(request.getToken());
    return ResponseEntity.ok(isValid);
  }

  @PostMapping("/refresh")
  public ResponseEntity<TokenDto> refresh(@RequestHeader("Authorization") String refreshToken) {
    TokenDto tokenDto = authService.refresh(refreshToken.substring(7));
    return ResponseEntity.ok(tokenDto);
  }
}
