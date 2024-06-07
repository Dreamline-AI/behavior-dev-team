package com.sustainability.mvp.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;

import com.sustainability.mvp.entity.Profile;
import com.sustainability.mvp.exception.UserException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ProfileService {
    private static final String COLLECTION_NAME = "Profile";

    public String saveProfile(Profile profile) throws ExecutionException, InterruptedException {
        //Saves profile to Firestore and if the profile already exists (based on the first name), it updates the existing profile.
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(profile.getFirstName()).set(profile);
        return collectionApiFuture.get().getUpdateTime().toString();
    }


    public Profile getProfileDetailsByID(@PathVariable String userid) throws ExecutionException, InterruptedException {
        // Retrieves a profile from Firestore using the provided user ID.
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(userid);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();

        Profile profile= null;
        if (document.exists()) {
            profile = document.toObject(Profile.class);
            return profile;
        }
        else {
            throw new UserException("No such user found with ID: " + userid);
        }
    }
    public List<Profile> getProfileDetails() throws ExecutionException, InterruptedException {
        //Retrieves details of all profiles stored in the Firestore collection.
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Iterable<DocumentReference> documentReference = dbFirestore.collection(COLLECTION_NAME).listDocuments();
        Iterator<DocumentReference> iterator = documentReference.iterator();
        List<Profile> profileList = new ArrayList<>();
        Profile profile = null;

        while(iterator.hasNext()) {
            DocumentReference documentReference1 = iterator.next();
            ApiFuture<DocumentSnapshot> future = documentReference1.get();
            DocumentSnapshot document = future.get();
            profile = document.toObject(Profile.class);
            profileList.add(profile);

        }

        return profileList;
    }
}
