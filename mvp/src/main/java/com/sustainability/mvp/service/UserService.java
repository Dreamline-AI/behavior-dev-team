package com.sustainability.mvp.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import com.sustainability.mvp.entity.Profile;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.sustainability.mvp.entity.Task;
import com.sustainability.mvp.entity.User;
import com.sustainability.mvp.exception.UserException;

@Service
public class UserService {

    private static final String COLLECTION_NAME = "users";
    private final TaskService taskService;

    public UserService(TaskService taskService) {
        this.taskService = taskService;
    }

    public String saveUser(User user) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Map<String, String> userMap = new HashMap<>();
        userMap.put("firstName", user.getFirstName());
        userMap.put("lastName", user.getLastName());
        userMap.put("email", user.getEmail());
        userMap.put("zipcode", user.getZipcode());
        userMap.put("userID", user.getUserID());
        userMap.put("password", user.getPassword() != null ? user.getPassword() : ""); // Save password, empty string if null
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


    public Integer getVoltCoins(String userID) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(userID);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        User user  = null;
        if (document.exists()) {
            user = document.toObject(User.class);
            return user.getVoltCoins(); 
        } else {
            throw new UserException("No such user found with ID: " + userID);
        }
    }
    public Integer updateVoltCoins(String userID, Integer voltCoins) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(userID);

        try {
            ApiFuture<DocumentSnapshot> future = documentReference.get();
            DocumentSnapshot document = future.get();

            if (document.exists()) {
                Profile profile = document.toObject(Profile.class);
                Integer currentVoltCoins = profile.getVoltCoins();

                System.out.println("Current VoltCoins: " + currentVoltCoins);
                System.out.println("Adding " + voltCoins + " to current voltCoins");

                Integer updatedVoltCoins = currentVoltCoins + voltCoins;
                profile.setVoltCoins(updatedVoltCoins);

                System.out.println("Updated VoltCoins: " + updatedVoltCoins);

                ApiFuture<WriteResult> updateFuture = documentReference.update("voltCoins", updatedVoltCoins);
                updateFuture.get();
                return updatedVoltCoins;
            } else {
                System.out.println("No user found with ID: " + userID);
                throw new UserException("No such user found with ID: " + userID);
            }
        } catch (ExecutionException | InterruptedException e) {
            System.out.println("Error updating voltCoins for user ID: " + userID);
            throw e;
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

    public String deleteUserByUserID(String userID) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(userID).delete();
        return "Deleted successfully for user with ID:" + userID + " at " + collectionApiFuture.get().getUpdateTime();
    }

    public List<Task> getUserIncompleteTasks(String userID) throws ExecutionException, InterruptedException {
        List<Task> tasks = taskService.getUnfinishedTasksByUser(userID);
        return tasks.stream()
                .filter(Task::isStatus)
                .collect(Collectors.toList());
    }
}