package com.sustainability.mvp.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Service
public class FirebaseInitialization {

    @PostConstruct
    public void initialization() {
        try {
            String googleApplicationCredentials = System.getenv("GOOGLE_APPLICATION_CREDENTIALS");
            if (googleApplicationCredentials == null) {
                throw new IllegalStateException("GOOGLE_APPLICATION_CREDENTIALS environment variable is not set.");
            }

            GoogleCredentials credentials = GoogleCredentials.getApplicationDefault();
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(credentials)
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
        } catch (Exception e) {
            throw new IllegalStateException("Firebase initialization failed", e);
        }
    }
}