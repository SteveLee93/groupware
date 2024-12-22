package auth_service.service;

import auth_service.dto.LoginRequest;
import auth_service.dto.SignUpRequest;
import auth_service.dto.TokenDto;
import auth_service.entity.User;
import auth_service.enums.UserRole;
import auth_service.exception.JwtAuthenticationException;
import auth_service.jwt.JwtTokenProvider;
import auth_service.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;

import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
@TestPropertySource(locations = "classpath:application-test.yml")
class AuthServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private JwtTokenProvider jwtTokenProvider;
    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    private SignUpRequest signUpRequest;
    private LoginRequest loginRequest;

    @BeforeEach
    void setUp() {
        signUpRequest = new SignUpRequest();
        signUpRequest.setEmail("test@test.com");
        signUpRequest.setPassword("password");
        signUpRequest.setName("Test User");

        loginRequest = new LoginRequest();
        loginRequest.setEmail("test@test.com");
        loginRequest.setPassword("password");
    }

    @Test
    void signup_ShouldCreateNewUser() {
        // Given
        given(userRepository.existsByEmail(signUpRequest.getEmail())).willReturn(false);
        given(passwordEncoder.encode(signUpRequest.getPassword())).willReturn("encodedPassword");

        // When
        authService.signup(signUpRequest);

        // Then
        verify(userRepository).save(any(User.class));
    }

    @Test
    void signup_WithExistingEmail_ShouldThrowException() {
        // Given
        given(userRepository.existsByEmail(signUpRequest.getEmail())).willReturn(true);

        // When & Then
        assertThatThrownBy(() -> authService.signup(signUpRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Email already exists");
    }

    @Test
    void login_ShouldReturnTokenDto() {
        // Given
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(), loginRequest.getPassword());
        given(authenticationManager.authenticate(any())).willReturn(authentication);
        given(jwtTokenProvider.createAccessToken(authentication)).willReturn("accessToken");
        given(jwtTokenProvider.createRefreshToken(authentication)).willReturn("refreshToken");
        given(jwtTokenProvider.getAccessTokenValidityInMilliseconds()).willReturn(3600000L);

        // When
        TokenDto result = authService.login(loginRequest);

        // Then
        assertThat(result.getAccessToken()).isEqualTo("accessToken");
        assertThat(result.getRefreshToken()).isEqualTo("refreshToken");
        assertThat(result.getGrantType()).isEqualTo("Bearer");
    }
}