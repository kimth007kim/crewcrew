package matchTeam.crewcrew.auth;


// 시큐리티가 /login 주소 요청이 오면 낚아채서 로그인 진행
// 로그인을 진행이 완료가되면 시큐리티 session을 만들어준다. (Security ContextHolder)
// 오브젝트 타입=> Authentication 타입 객체
// Authentication객체 안에 User정보가 있어야됨
// User 오브젝트의 타입 => UserDetails객체 타입

// Security Session => Authentication => UserDetails


import matchTeam.crewcrew.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class PrincipalDetails implements UserDetails {

    private User user; //콤포지션

    public PrincipalDetails(User user) {
        this.user = user;
    }

    //해당 User의 권한을 리턴하는곳

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collect  = new ArrayList<>();
        collect.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return user.getRole();
            }
        });

        return collect;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
