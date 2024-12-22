package auth_service.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

  @Value("${jwt.secret}")
  private String secretKey;

  @Value("${jwt.access-token-validity}")
  private long accessTokenValidityInMilliseconds;

  @Value("${jwt.refresh-token-validity}")
  private long refreshTokenValidityInMilliseconds;

  private Key key;

  @PostConstruct
  protected void init() {
    secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
  }

  // Access Token 생성
  public String createAccessToken(Authentication authentication) {
    return createToken(authentication, accessTokenValidityInMilliseconds);
  }

  // Refresh Token 생성
  public String createRefreshToken(Authentication authentication) {
    return createToken(authentication, refreshTokenValidityInMilliseconds);
  }

  // 토큰 생성 로직
  private String createToken(Authentication authentication, long validityInMilliseconds) {
    String username = authentication.getName();
    Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

    Claims claims = Jwts.claims().setSubject(username);
    claims.put("roles", authorities.stream()
        .map(GrantedAuthority::getAuthority)
        .collect(Collectors.toList()));

    Date now = new Date();
    Date validity = new Date(now.getTime() + validityInMilliseconds);

    return Jwts.builder()
        .setClaims(claims)
        .setIssuedAt(now)
        .setExpiration(validity)
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();
  }

  // 토큰에서 Authentication 객체 추출
  public Authentication getAuthentication(String token) {
    Claims claims = extractClaims(token);

    Collection<? extends GrantedAuthority> authorities = Arrays.stream(claims.get("roles").toString().split(","))
        .map(SimpleGrantedAuthority::new)
        .collect(Collectors.toList());

    return new UsernamePasswordAuthenticationToken(claims.getSubject(), "", authorities);
  }

  // 토큰 유효성 검증
  public boolean validateToken(String token) {
    try {
      Jwts.parserBuilder()
          .setSigningKey(key)
          .build()
          .parseClaimsJws(token);
      return true;
    } catch (JwtException | IllegalArgumentException e) {
      log.error("Invalid JWT token: {}", e.getMessage());
      return false;
    }
  }

  // Claims 추출
  private Claims extractClaims(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(key)
        .build()
        .parseClaimsJws(token)
        .getBody();
  }

  // 토큰에서 username 추출
  public String getUsername(String token) {
    return extractClaims(token).getSubject();
  }

  public long getAccessTokenValidityInMilliseconds() {
    return this.accessTokenValidityInMilliseconds;
  }
}
