package auth_service.controller;

import auth_service.dto.LoginRequest;
import auth_service.dto.SignUpRequest;
import auth_service.dto.TokenDto;
import auth_service.dto.TokenValidationRequest;
import auth_service.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class) // @SpringBootTest 대신 @WebMvcTest 사용
class AuthControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  private AuthService authService;

  private SignUpRequest signUpRequest;
  private LoginRequest loginRequest;
  private TokenDto tokenDto;

  @BeforeEach
  void setUp() {
    // SignUpRequest 설정
    signUpRequest = new SignUpRequest();
    signUpRequest.setEmail("test@test.com");
    signUpRequest.setPassword("password123");
    signUpRequest.setName("Test User");

    // LoginRequest 설정
    loginRequest = new LoginRequest();
    loginRequest.setEmail("test@test.com");
    loginRequest.setPassword("password123");

    // TokenDto 설정
    tokenDto = TokenDto.builder()
        .grantType("Bearer")
        .accessToken("test.access.token")
        .refreshToken("test.refresh.token")
        .accessTokenExpiresIn(3600000L)
        .build();
  }

  @Test
  @WithMockUser // Spring Security 테스트를 위한 어노테이션 추가
  void signup_ShouldReturn200() throws Exception {
    // When & Then
    mockMvc.perform(post("/auth/signup")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(signUpRequest)))
        .andDo(print()) // 테스트 결과를 콘솔에 출력
        .andExpect(status().isOk());
  }

  @Test
  @WithMockUser
  void login_ShouldReturnTokens() throws Exception {
    // Given
    given(authService.login(any(LoginRequest.class))).willReturn(tokenDto);

    // When & Then
    mockMvc.perform(post("/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(loginRequest)))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.grantType").value("Bearer"))
        .andExpect(jsonPath("$.accessToken").value("test.access.token"))
        .andExpect(jsonPath("$.refreshToken").value("test.refresh.token"))
        .andExpect(jsonPath("$.accessTokenExpiresIn").value(3600000L));
  }

  @Test
  @WithMockUser
  void validateToken_WithValidToken_ShouldReturnTrue() throws Exception {
    // Given
    TokenValidationRequest request = new TokenValidationRequest();
    request.setToken("valid.test.token");
    given(authService.validateToken(any())).willReturn(true);

    // When & Then
    mockMvc.perform(post("/auth/validate")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").value(true));
  }

  @Test
  @WithMockUser
  void refresh_ShouldReturnNewTokens() throws Exception {
    // Given
    given(authService.refresh(any())).willReturn(tokenDto);

    // When & Then
    mockMvc.perform(post("/auth/refresh")
        .header("Authorization", "Bearer test.refresh.token"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.grantType").value("Bearer"))
        .andExpect(jsonPath("$.accessToken").value("test.access.token"))
        .andExpect(jsonPath("$.refreshToken").value("test.refresh.token"));
  }
}