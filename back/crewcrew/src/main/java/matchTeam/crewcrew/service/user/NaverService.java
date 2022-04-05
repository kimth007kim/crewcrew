package matchTeam.crewcrew.service.user;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.dto.social.NaverProfile;
import matchTeam.crewcrew.dto.social.RetNaverOAuth;
import matchTeam.crewcrew.response.exception.auth.CCommunicationException;
//import matchTeam.crewcrew.response.exception.auth.CKakaoCommunicationException;
import matchTeam.crewcrew.response.exception.auth.CNaverCommunicationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class NaverService {
    private final Environment env;
    private final RestTemplate restTemplate;
    private final Gson gson;

    @Value("${url.base}")
    private String baseUrl;

    @Value("${spring.jwt.secret}")
    private String secretKey;

    @Value("${social.naver.client-id}")
    private String naverClientId;

    @Value("${social.naver.redirect}")
    private String naverRedirectUri ;

    @Value("${social.naver.secret}")
    private String naverSecret;

    private String generateRandomString() {
        return UUID.randomUUID().toString();
    }

    public RetNaverOAuth getNaverTokenInfo(String code){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//        String state = generateRandomString();
        MultiValueMap<String,String> params = new LinkedMultiValueMap<>();
        params.add("grant_type","authorization_code");
        params.add("client_id",naverClientId);
        params.add("client_secret",naverSecret);
        params.add("code",code);
        params.add("state",secretKey);



        String requestUri = env.getProperty("social.naver.url.token");
        if(requestUri==null) throw new CCommunicationException();
        HttpEntity<MultiValueMap<String,String>> request = new HttpEntity<>(params,headers);
        ResponseEntity<String> response= restTemplate.postForEntity(requestUri,request,String.class);

        if(response.getStatusCode()== HttpStatus.OK)
            return gson.fromJson(response.getBody(), RetNaverOAuth.class);
        throw new CNaverCommunicationException();
    }

    public NaverProfile getNaverProfile(String token){
        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization","Bearer "+token);

        MultiValueMap<String,String> params = new LinkedMultiValueMap<>();

        String requestUrl = env.getProperty("social.naver.url.profile");
        if(requestUrl==null) throw new CNaverCommunicationException();


        HttpEntity<MultiValueMap<String,String>> request = new HttpEntity<>(null,headers);
        try{
            ResponseEntity<String> response= restTemplate.postForEntity(requestUrl,request,String.class);
            System.out.println(response.getHeaders());
            if(response.getStatusCode()== HttpStatus.OK)
                return gson.fromJson(response.getBody(), NaverProfile.class);
            log.error("header : "+ response.getHeaders());
        }catch(Exception e){
            log.error(e.toString());
            throw new CNaverCommunicationException();
        }
        throw new CNaverCommunicationException();
    }
}
