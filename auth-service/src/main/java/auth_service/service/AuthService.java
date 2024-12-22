package auth_service.service;

import auth_service.dto.LoginRequest;
import auth_service.dto.SignUpRequest;
import auth_service.dto.TokenDto;
import auth_service.entity.User;
import auth_service.enums.UserRole;
import auth_service.exception.JwtAuthenticationException;
import auth_service.jwt.JwtTokenProvider;
import auth_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final AuthenticationManager authenticationManager;
  private final JwtTokenProvider jwtTokenProvider;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Transactional
  public void signup(SignUpRequest request) {
    if (userRepository.existsByEmail(request.getEmail())) {
      throw new RuntimeException("Email already exists");
    }

    User user = User.builder()
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .name(request.getName())
        .roles(Collections.singleton(UserRole.ROLE_USER))
        .build();

    userRepository.save(user);
  }

  @Transactional
  public TokenDto login(LoginRequest request) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

    String accessToken = jwtTokenProvider.createAccessToken(authentication);
    String refreshToken = jwtTokenProvider.createRefreshToken(authentication);

    return TokenDto.builder()
        .grantType("Bearer")
        .accessToken(accessToken)
        .refreshToken(refreshToken)
        .accessTokenExpiresIn(jwtTokenProvider.getAccessTokenValidityInMilliseconds())
        .build();
  }

  @Transactional
  public TokenDto refresh(String refreshToken) {
    if (!jwtTokenProvider.validateToken(refreshToken)) {
      throw new JwtAuthenticationException("Invalid refresh token");
    }

    Authentication authentication = jwtTokenProvider.getAuthentication(refreshToken);

    String newAccessToken = jwtTokenProvider.createAccessToken(authentication);
    String newRefreshToken = jwtTokenProvider.createRefreshToken(authentication);

    return TokenDto.builder()
        .grantType("Bearer")
        .accessToken(newAccessToken)
        .refreshToken(newRefreshToken)
        .accessTokenExpiresIn(jwtTokenProvider.getAccessTokenValidityInMilliseconds())
        .build();
  }

  public boolean validateToken(String token) {
    return jwtTokenProvider.validateToken(token);
  }
}
