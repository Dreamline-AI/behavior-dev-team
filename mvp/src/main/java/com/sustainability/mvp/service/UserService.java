package com.sustainability.mvp.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.sustainability.mvp.entity.Task;
import com.sustainability.mvp.entity.User;
import com.sustainability.mvp.exception.UserException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class UserService {

    private static final String COLLECTION_NAME = "users";
//    private final TaskService taskService;
//
//    public UserService(TaskService taskService) {
//        this.taskService = taskService;
//    }

    public String saveUser(User user) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Map<String, String> userMap = new HashMap<>();
        userMap.put("firstName", user.getFirstName());
        userMap.put("lastName", user.getLastName());
        userMap.put("email", user.getEmail());
        userMap.put("zipcode", user.getZipcode());
        userMap.put("userID", user.getUserID());
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

    public String deleteUserByUserID(String userID) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(userID).delete();
        return "Deleted successfully for user with ID:" + userID + " at " + collectionApiFuture.get().getUpdateTime();
    }

//    public List<Task> getUserIncompleteTasks(String userID) throws ExecutionException, InterruptedException {
//        List<Task> tasks = taskService.getUnfinishedTasksByUser(userID);
//        return tasks.stream()
//                .filter(Task::isStatus)
//                .collect(Collectors.toList());
//    }
}

