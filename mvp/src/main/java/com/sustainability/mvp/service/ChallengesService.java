package com.sustainability.mvp.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.sustainability.mvp.entity.Challenges;


import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ChallengesService {


    private static final String COLLECTION_NAME = "challenges";

    public String saveChallenge(Challenges challenge) throws ExecutionException, InterruptedException {

        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(challenge.getChallengeID()).set(challenge);
        return collectionApiFuture.get().getUpdateTime().toString();
    }

    public List<Challenges> getChallengeINFO() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Iterable<DocumentReference> documentReference = dbFirestore.collection(COLLECTION_NAME).listDocuments();
        Iterator<DocumentReference> iterator = documentReference.iterator();
        List<Challenges> challengesList = new ArrayList<>();
        Challenges challenge = null;

        while (iterator.hasNext()) {
            DocumentReference documentReference1 = iterator.next();
            ApiFuture<DocumentSnapshot> future = documentReference1.get();
            DocumentSnapshot document = future.get();
            challenge = document.toObject(Challenges.class);
            challengesList.add(challenge);

        }

        return challengesList;
    }




    public Challenges getChallengeById(String challengeGroup) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(challengeGroup);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        Challenges challenge = null;

        if (document.exists()) {
            challenge = document.toObject(Challenges.class);
            return challenge;
        }
        else {
            return null;
        }

    }

    public String updateChallenge(Challenges challenge) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(challenge.getChallengeID()).set(challenge);
        return collectionApiFuture.get().getUpdateTime().toString();
    }

}

