package com.sustainability.mvp.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

import com.sustainability.mvp.entity.Trivia;
import com.sustainability.mvp.exception.UserException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class TriviaService {
    private static final String COLLECTION_NAME = "Trivia";

    public String saveTrivia(Trivia trivia) throws ExecutionException, InterruptedException {
//        This function saves a new trivia entry in the Firestore.
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(trivia.getUserID()).set(trivia);
        return collectionApiFuture.get().getUpdateTime().toString();
    }
    public Trivia getTriviaDetailsByName(@PathVariable String userid) throws ExecutionException, InterruptedException {
//        This function retrieves a trivia entry by user ID.
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(userid);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();

        Trivia trivia= null;
        if (document.exists()) {
            trivia = document.toObject(Trivia.class);
            return trivia;
        }
        else {
            throw new UserException("No such user found with ID: " + userid);
        }
    }
    public List<Trivia> getTriviaDetails() throws ExecutionException, InterruptedException {
//        THis fucntion fetches all trivia entries from the Firestore.
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Iterable<DocumentReference> documentReference = dbFirestore.collection(COLLECTION_NAME).listDocuments();
        Iterator<DocumentReference> iterator = documentReference.iterator();
        List<Trivia> triviaList = new ArrayList<>();
        Trivia trivia = null;

        while(iterator.hasNext()) {
            DocumentReference documentReference1 = iterator.next();
            ApiFuture<DocumentSnapshot> future = documentReference1.get();
            DocumentSnapshot document = future.get();
            trivia = document.toObject(Trivia.class);
            triviaList.add(trivia);

        }

        return triviaList;
    }

    public String updateTriviaUserid(Trivia trivia) throws ExecutionException, InterruptedException {
//        This function  updates an existing trivia entry based on the user ID.
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(trivia.getUserID()).set(trivia);
        return collectionApiFuture.get().getUpdateTime().toString();
    }
    public String deleteTriviaUser(@PathVariable String userid) throws ExecutionException, InterruptedException {
//      Deletes a trivia entry based on the provided user ID
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(userid).delete();
        return "Document with Incentive UserID" + userid + " has been successfully deleted";
    }
}
