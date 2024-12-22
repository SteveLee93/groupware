package auth_service.entity;

import auth_service.enums.UserRole;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = false)
  private String email;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  private String name;

  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
  @Enumerated(EnumType.STRING)
  private Set<UserRole> roles = new HashSet<>();

  @Column(nullable = false)
  private boolean enabled = true;

  @Builder
  public User(String email, String password, String name, Set<UserRole> roles) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.roles = roles != null ? roles : new HashSet<>();
  }

  public void updatePassword(String newPassword) {
    this.password = newPassword;
  }

  public void addRole(UserRole role) {
    this.roles.add(role);
  }

  public void removeRole(UserRole role) {
    this.roles.remove(role);
  }

  public void disable() {
    this.enabled = false;
  }

  public void enable() {
    this.enabled = true;
  }
}
