package matchTeam.crewcrew.oauth2.info.impl;

import matchTeam.crewcrew.oauth2.info.OAuth2UserInfo;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {
    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getName() {
        Map<String,Object> response=(Map<String,Object>) attributes.get("properties");
        if(response==null){
            return null;
        }
        return (String) response.get("nickname");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("account_email");
    }

    @Override
    public String getImageUrl() {
        Map<String,Object> response=(Map<String,Object>) attributes.get("properties");
        if(response==null){
            return null;
        }
        return (String) response.get("thumbnail_image");
    }
}
