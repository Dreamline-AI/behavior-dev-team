package com.sustainability.mvp.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.sustainability.mvp.entity.TakeAction;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.logging.Logger;

@Service
public class TakeActionService {

    private static final Logger logger = Logger.getLogger(TakeActionService.class.getName());
    private static final String COLLECTION_NAME = "TakeActions";

    public List<TakeAction> getTakeActionsByUserId(String userId) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        List<TakeAction> takeActions = new ArrayList<>();
        ApiFuture<QuerySnapshot> querySnapshot = dbFirestore.collection(COLLECTION_NAME)
                .whereEqualTo("userId", userId)
                .get();

        List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();
        logger.info("Documents fetched: " + documents.size());

        for (DocumentSnapshot document : documents) {
            logger.info("Document data: " + document.getData());
            takeActions.add(document.toObject(TakeAction.class));
        }
        return takeActions;
    }
}
