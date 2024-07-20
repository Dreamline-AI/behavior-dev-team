package com.sustainability.mvp;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.core.io.ClassPathResource;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class MvpApplication {

    public static void main(String[] args) {
        try {
            initializeFirebase();
            SpringApplication.run(MvpApplication.class, args);
        } catch (IOException e) {
            System.err.println("Failed to initialize Firebase: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void initializeFirebase() throws IOException {
        ClassPathResource resource = new ClassPathResource("serviceAccountKey.json");
        InputStream serviceAccount = resource.getInputStream();

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }
}