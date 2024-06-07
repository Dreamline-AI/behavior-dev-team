package com.sustainability.mvp.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.sustainability.mvp.entity.User;
import com.sustainability.mvp.exception.UserException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class UserService {
    private static final String COLLECTION_NAME = "users";

    public String saveUser(User user) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Map<String, String> userMap = new HashMap<>();
        userMap.put("firstName", user.getFirstName());
        userMap.put("lastName", user.getLastName());
        userMap.put("email", user.getEmail());
        userMap.put("zipcode", user.getZipcode());
        userMap.put("userID", user.getUserID());
//        userMap.put("avatar", user.getAvatar());
//        userMap.put("rankProgress", String.valueOf(user.getRankProgress()));
//        userMap.put("rank", user.getRank());
//        userMap.put("streak", String.valueOf(user.getStreak()));
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(user.getUserID()).set(userMap);
        return "Saved successfully for user with ID:" + user.getUserID() + " at " + collectionApiFuture.get().getUpdateTime();
    }

    public List<User> getUserDetails() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Iterable<DocumentReference> documentReference = dbFirestore.collection(COLLECTION_NAME).listDocuments();
        Iterator<DocumentReference> iterator = documentReference.iterator();
        List<User> userList = new ArrayList<>();
        User user = null;

        while(iterator.hasNext()) {
            DocumentReference documentReference1 = iterator.next();
            ApiFuture<DocumentSnapshot> future = documentReference1.get();
            DocumentSnapshot document = future.get();
            user = document.toObject(User.class);
            userList.add(user);

        }
        return userList;
    }

    public User getUserByUserID(String userID) throws ExecutionException, InterruptedException{
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(userID);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();

        User user = null;
        if(document.exists()){
            user = document.toObject(User.class);
            return user;
        }else{
            throw new UserException("No such user found with ID: " + userID);
        }
    }

    public String updateUserByUserID(String userID, Map<String, Object> updates) throws ExecutionException, InterruptedException{
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(userID);
        try{
            ApiFuture<WriteResult> collectionApiFuture = documentReference.update(updates);
            return "User updated successfully at " + collectionApiFuture.get().getUpdateTime();
        } catch (Exception e) {
            if (e.getCause() instanceof UserException) {
                return "No such user found with ID: " + userID;
            } else {
                return "Update failed for user with ID: " + userID;
            }
        }
    }

    public String getUserFirstNameById(String userID) throws ExecutionException, InterruptedException {
        User user = getUserByUserID(userID);
        return user.getFirstName();
    }

    public String updateUserByUserID(String userID) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(userID).delete();
        return "Saved successfully for user with ID:" + userID + " at " + collectionApiFuture.get().getUpdateTime();
    }






}
