package matchTeam.crewcrew.service;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matchTeam.crewcrew.dto.social.RetNaverOAuth;
import matchTeam.crewcrew.response.exception.CCommunicationException;
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
public class NaverService {
    private final Environment env;
    private final RestTemplate restTemplate;
    private final Gson gson;

    @Value("${url.base}")
    private String baseUrl;

    @Value("${social.naver.client-id}")
    private String naverClientId;

    @Value("${social.naver.redirect}")
    private String naverRedirectUri ;

    @Value("${social.naver.secret}")
    private String naverSecret;

    public RetNaverOAuth getNaverTokenInfo(String code){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String,String> params = new LinkedMultiValueMap<>();
        params.add("grant_type","authorization_code");
        params.add("client_id",naverClientId);
        params.add("client_secret",naverSecret);
        params.add("code",code);
        params.add("state","9kgsGTfH4j7IyAkg");



        String requestUri = env.getProperty("social.naver.url.token");
        if(requestUri==null) throw new CCommunicationException();
        HttpEntity<MultiValueMap<String,String>> request = new HttpEntity<>(params,headers);
        ResponseEntity<String> response= restTemplate.postForEntity(requestUri,request,String.class);

        if(response.getStatusCode()== HttpStatus.OK)
            return gson.fromJson(response.getBody(), RetNaverOAuth.class);
        throw new CCommunicationException();
    }
}
