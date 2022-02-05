package matchTeam.crewcrew.entity.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import matchTeam.crewcrew.entity.BaseTimeEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User extends BaseTimeEntity implements UserDetails {
//public class User{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    @Column(nullable = false, unique = true)
    @NotNull
    private String email;

    @Column
    private String introduce;


    @Column
    private String name;

    @JsonProperty(access= JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false,length=100)
    private String password;

    @Column(name = "profile_image")
    private byte[] profileImage;

    @Column
    private String nickname;


    @Column(length=100)
    private String provider;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public String getUsername() {
        return email;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isEnabled() {
        return true;
    }
}
