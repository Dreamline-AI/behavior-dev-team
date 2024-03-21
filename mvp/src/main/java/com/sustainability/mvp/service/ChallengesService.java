package com.sustainability.mvp.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.sustainability.mvp.entity.Challenges;

import org.springframework.stereotype.Service;


import java.util.concurrent.ExecutionException;

@Service
public class ChallengesService {


    private static final String COLLECTION_NAME = "challenges";

    public String saveChallenge(Challenges challenge) throws ExecutionException, InterruptedException {

        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(challenge.getChallengeID()).set(challenge);
        return collectionApiFuture.get().getUpdateTime().toString();
    }

    public Challenges getChallengeByGroup(String challengeGroup) throws ExecutionException, InterruptedException {
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

    public Challenges getChallengeById(String challengeID) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(challengeID);
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

