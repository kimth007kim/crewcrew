package matchTeam.crewcrew.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @SuppressWarnings("desprecation")
    private ApiInfo apiInfo(){
        return new ApiInfoBuilder()
                .title("Test EMP API")
                .description("Spring Boot ")
                .version("V1")
                .build();
    }

    @Bean
    public Docket api(){
        String version="V1";
        return new Docket(DocumentationType.SWAGGER_2)
                .useDefaultResponseMessages(false)
                .apiInfo(apiInfo())
                .groupName(version)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
//                .paths(PathSelectors.ant("/v1/***"))
                .build();
    }

}
