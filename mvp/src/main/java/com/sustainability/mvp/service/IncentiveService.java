package com.sustainability.mvp.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.sustainability.mvp.entity.Incentive;
import com.sustainability.mvp.entity.Product;
import org.springframework.stereotype.Service;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class IncentiveService {
    private static final String COLLECTION_NAME = "incentives";
    public String saveIncentive(Incentive incentive) throws ExecutionException, InterruptedException {
//        Saves an incentive to Firestore and if an incentive with the same ID exists, it updates the existing record.
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME)
                .document(incentive.getUserID()) // Assume there is a getIncentiveID method in Incentive class
                .set(incentive);
        return collectionApiFuture.get().getUpdateTime().toString();
    }
    public List<Incentive> getIncentiveInfo() throws ExecutionException, InterruptedException {
//        Retrieves all incentive Information from Firestore.
        Firestore dbFirestore = FirestoreClient.getFirestore();
        List<Incentive> incentiveList = new ArrayList<>();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection(COLLECTION_NAME).get();

        for (QueryDocumentSnapshot document : future.get().getDocuments()) {
            incentiveList.add(document.toObject(Incentive.class));
        }
        return incentiveList;
    }

    public List<Incentive> getIncentivesByUser(@PathVariable String userID) throws ExecutionException, InterruptedException {
        // This function fetches the specific incentive information associated with a specific user ID.
        Firestore dbFirestore = FirestoreClient.getFirestore();
        List<Incentive> incentives = new ArrayList<>();
        ApiFuture<QuerySnapshot> querySnapshot = dbFirestore.collection(COLLECTION_NAME)
                .whereEqualTo("userID", userID)
                .get();

        for (DocumentSnapshot document : querySnapshot.get().getDocuments()) {
            incentives.add(document.toObject(Incentive.class));
        }
        return incentives;
    }

    public List<Incentive> getIncentivesByTypeAndUser(@PathVariable String userID,@PathVariable String type) throws ExecutionException, InterruptedException {
        //Retrieves all incentives of a specific type associated with a specific user ID and returns list of incentive objects
        Firestore dbFirestore = FirestoreClient.getFirestore();
        List<Incentive> incentives = new ArrayList<>();
        ApiFuture<QuerySnapshot> querySnapshot = dbFirestore.collection(COLLECTION_NAME)
                .whereEqualTo("userID", userID)
                .whereEqualTo("type", type)
                .get();

        for (DocumentSnapshot document : querySnapshot.get().getDocuments()) {
            incentives.add(document.toObject(Incentive.class));
        }
        return incentives;
    }
//    public String updatePhoto(Incentive incentive) throws ExecutionException, InterruptedException {
//
//        Firestore dbFirestore = FirestoreClient.getFirestore();
//        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(incentive.getPhoto()).set(incentive);
//        return collectionApiFuture.get().getUpdateTime().toString();
//    }
//
//    public String deleteIncentivePhoto(String photo) throws ExecutionException, InterruptedException {
//
//        Firestore dbFirestore = FirestoreClient.getFirestore();
//        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(photo).delete();
//        return "Document with Incentive photo" + photo + " has been successfully deleted";
//    }
//    public String deleteIncentiveUser(String userid) throws ExecutionException, InterruptedException {
//
//        Firestore dbFirestore = FirestoreClient.getFirestore();
//        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(userid).delete();
//        return "Document with Incentive UserID" + userid + " has been successfully deleted";
//    }
}

