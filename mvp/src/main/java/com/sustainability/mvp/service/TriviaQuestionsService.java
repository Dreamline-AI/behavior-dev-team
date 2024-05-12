package com.sustainability.mvp.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.sustainability.mvp.entity.TriviaQuestions;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class TriviaQuestionsService {

    public TriviaQuestions findQuestionById(String questionId) throws ExecutionException, InterruptedException {

        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("TriviaQuestions").document(questionId);
        ApiFuture<DocumentSnapshot> documentSnapshot = documentReference.get();
        DocumentSnapshot document = documentSnapshot.get();
        TriviaQuestions triviaQuestions = null;
        if (document.exists()) {
            triviaQuestions = document.toObject(TriviaQuestions.class);
            return triviaQuestions;
        }
        return null;

    }

}
