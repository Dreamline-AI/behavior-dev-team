package com.sustainability.mvp.security.models;

import java.util.Collection;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@ConfigurationProperties(prefix = "security")
@Data
@Getter
@Setter
public class SecurityProperties {

    private CookieProperties cookieProps;
    private FirebaseProperties firebaseProps;
    private boolean allowCredentials;
    private List<String> allowedOrigins;
    private List<String> allowedHeaders;
    private List<String> exposedHeaders;
    private List<String> allowedMethods;
    private List<String> allowedPublicApis;
    private List<String> superAdmins;
    private List<String> validApplicationRoles;

    public List<String> getValidApplicationRoles() {
        return null;
    }
}