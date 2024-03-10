package com.sustainability.mvp;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

@SpringBootApplication
public class MvpApplication {

	public static void main(String[] args) throws IOException {

		ClassLoader classLoader = MvpApplication.class.getClassLoader();
		InputStream inputStream =  new ClassPathResource("/serviceAccountKey.json").getInputStream();
		File file = new File(Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json")).getFile());

		try {
			FileInputStream serviceAccount =
					new FileInputStream("path/to/serviceAccountKey.json");

			FirebaseOptions options = new FirebaseOptions.Builder()
					.setCredentials(GoogleCredentials.fromStream(serviceAccount))
					.build();

			FirebaseApp.initializeApp(options);

		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
		SpringApplication.run(MvpApplication.class, args);
	}

}
