package matchTeam.crewcrew.service.user;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.dto.social.KakaoProfile;
import matchTeam.crewcrew.dto.social.RetKakaoOAuth;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.exception.CrewException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RequiredArgsConstructor
@Service
public class KakaoService {
    private final Environment env;
    private final RestTemplate restTemplate;
    private final Gson gson;
    @Value("${url.base}")
    private String baseUrl;

    @Value("${social.kakao.client-id}")
    private String kakaoClientId;

    @Value("${social.kakao.redirect}")
    private String kakaoRedirectUri ;

    public KakaoProfile getKakaoProfile(String kakaoAccessToken){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization","Bearer "+kakaoAccessToken);
        System.out.println(headers);


        String requestUrl = env.getProperty("social.kakao.url.profile");
        System.out.println(requestUrl);
//        if(requestUrl==null) throw new CCommunicationException();

        HttpEntity<MultiValueMap<String,String>> request = new HttpEntity<>(null,headers);
        try{
            ResponseEntity<String> response= restTemplate.postForEntity(requestUrl,request,String.class);
            System.out.println(response.getHeaders());
            if(response.getStatusCode()== HttpStatus.OK)
                return gson.fromJson(response.getBody(),KakaoProfile.class);
            log.error("header : "+ response.getHeaders());
        }catch(Exception e){
            log.error(e.toString());
            throw new CrewException(ErrorCode.KAKAO_COMMUNICATION_FAILED);
        }
        throw new CrewException(ErrorCode.KAKAO_COMMUNICATION_FAILED);
    }

    public RetKakaoOAuth getKakaoTokenInfo(String code){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String,String> params = new LinkedMultiValueMap<>();
        params.add("grant_type","authorization_code");
        params.add("client_id",kakaoClientId);
        params.add("redirect_uri",baseUrl+kakaoRedirectUri);
        params.add("code",code);

        String requestUri = env.getProperty("social.kakao.url.token");
        if(requestUri==null) throw new CrewException(ErrorCode.KAKAO_COMMUNICATION_FAILED);
        HttpEntity<MultiValueMap<String,String>> request = new HttpEntity<>(params,headers);
        ResponseEntity<String> response= restTemplate.postForEntity(requestUri,request,String.class);

        if(response.getStatusCode()== HttpStatus.OK)
            return gson.fromJson(response.getBody(), RetKakaoOAuth.class);
        throw new CrewException(ErrorCode.KAKAO_COMMUNICATION_FAILED);
    }

    public void kakaoUnlink(String accessToken) {
        String unlinkUrl =env.getProperty("social.kakao.url.unlink");
        if(unlinkUrl==null) throw new CrewException(ErrorCode.KAKAO_COMMUNICATION_FAILED);

        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization","Bearer "+accessToken);

        HttpEntity<MultiValueMap<String,String>> request  = new HttpEntity<>(null,headers);
        ResponseEntity<String> response = restTemplate.postForEntity(unlinkUrl,request,String.class);

        if(response.getStatusCode()==HttpStatus.OK){
            log.info("unlink "+ response.getBody());
            return;
        }
        throw new CrewException(ErrorCode.KAKAO_COMMUNICATION_FAILED);
    }

}
