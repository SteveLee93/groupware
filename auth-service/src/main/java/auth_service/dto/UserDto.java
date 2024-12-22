package auth_service.dto;

import auth_service.entity.User;
import auth_service.enums.UserRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;

@Getter
@NoArgsConstructor
public class UserDto {
  private Long id;
  private String email;
  private String name;
  private Set<UserRole> roles;
  private boolean enabled;

  @Builder
  public UserDto(Long id, String email, String name, Set<UserRole> roles, boolean enabled) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.roles = roles;
    this.enabled = enabled;
  }

  public static UserDto from(User user) {
    return UserDto.builder()
        .id(user.getId())
        .email(user.getEmail())
        .name(user.getName())
        .roles(user.getRoles())
        .enabled(user.isEnabled())
        .build();
  }
}