package matchTeam.crewcrew.oauth2.service;

import lombok.*;
import matchTeam.crewcrew.entity.User;
import matchTeam.crewcrew.oauth2.entity.UserPrincipal;
import matchTeam.crewcrew.oauth2.exception.OAuthProviderMissMatchException;
import matchTeam.crewcrew.oauth2.info.OAuth2UserInfo;
import matchTeam.crewcrew.oauth2.entity.ProviderType;
import matchTeam.crewcrew.oauth2.info.OAuth2UserInfoFactory;
import matchTeam.crewcrew.repository.user.UserRepository;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.*;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);
        try{
            return this.process(userRequest,user);
        }catch(AuthenticationException ex){
            throw ex;
        }catch(Exception ex){
            ex.printStackTrace();
            throw new InternalAuthenticationServiceException(ex.getMessage(),ex.getCause());
        }

    }

    private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
        ProviderType providerType =ProviderType.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType,user.getAttributes());
        Optional<User> result = userRepository.findByEmail(userInfo.getEmail());
        User savedUser = result.get();
        if (savedUser!=null){
            if (providerType!= savedUser.getProviderType()){
                //optional타입 savedUser를 USer타입으로 변환해서 이 유저 존재한다고 알려주는것을 추가해야된다.
                throw new OAuthProviderMissMatchException("이미 "+providerType+"계정이 존재합니다."+savedUser.getProviderType()+"을 사용해서 로그인해주세요");
            }
            updateUser(savedUser,userInfo);
        }else{
            savedUser=createUser(userInfo,providerType);
        }
        return UserPrincipal.create(savedUser,user.getAttributes());
    }

    private User createUser(OAuth2UserInfo userInfo, ProviderType providerType) {
        User user = new User();
        return userRepository.saveAndFlush(user);
    }

    private void updateUser(User savedUser, OAuth2UserInfo userInfo) {
    }

}
