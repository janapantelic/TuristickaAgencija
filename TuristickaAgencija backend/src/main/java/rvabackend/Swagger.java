package rvabackend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class Swagger {

    @Bean
    OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Turisticka agencija API")
                        .version("1.0")
                        .description("Backend aplikacija za upravljanje turistickom agencijom (RVA projekat)"));
    }
}