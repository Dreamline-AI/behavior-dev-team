package com.sustainability.mvp.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;

@Service
public class FirebaseInitialization {

    @Autowired
    private ResourceLoader resourceLoader;

    @PostConstruct
    public void initialization() {

        FileInputStream serviceAccount = null;

        try {
            Resource fileResource = resourceLoader.getResource("classpath:serviceAccountKey.json");
            serviceAccount = new FileInputStream(fileResource.getFile());

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();
            if(FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
        }
        catch (Exception e) {
            throw new IllegalStateException("Firebase initialization failed", e);
        }



    }
}
