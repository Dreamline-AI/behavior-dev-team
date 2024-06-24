//package com.sustainability.mvp.service;
//
//import com.google.api.core.ApiFuture;
//import com.google.cloud.firestore.*;
//import com.google.firebase.cloud.FirestoreClient;
//import com.sustainability.mvp.entity.Task;
//
//
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.concurrent.ExecutionException;
//
//@Service
//public class TaskService {
//
//    private static final String COLLECTION_NAME = "tasks";
//    private final Firestore dbFirestore;
//
//    public TaskService() {
//        this.dbFirestore = FirestoreClient.getFirestore();
//    }
//
//    public String saveTask(Task task) throws ExecutionException, InterruptedException {
//        String userID = task.getUserID();
//        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME)
//                .document(task.getTaskID())
//                .set(task);
//        return collectionApiFuture.get().getUpdateTime().toString();
//    }
//
//    public List<Task> getTaskINFO() throws ExecutionException, InterruptedException {
//        List<Task> taskList = new ArrayList<>();
//        ApiFuture<QuerySnapshot> querySnapshot = dbFirestore.collection(COLLECTION_NAME).get();
//        for (QueryDocumentSnapshot document : querySnapshot.get().getDocuments()) {
//            Task task = document.toObject(Task.class);
//            taskList.add(task);
//        }
//        return taskList;
//    }
//
//    public List<Task> getUnfinishedTasksByUser(String userID) throws ExecutionException, InterruptedException {
//        List<Task> unfinishedTasks = new ArrayList<>();
//        ApiFuture<QuerySnapshot> querySnapshot = dbFirestore.collection(COLLECTION_NAME)
//                .whereEqualTo("userID", userID)
//                .whereEqualTo("status", false) // false represents "unfinished"
//                .get();
//
//        for (QueryDocumentSnapshot document : querySnapshot.get().getDocuments()) {
//            Task task = document.toObject(Task.class);
//            unfinishedTasks.add(task);
//        }
//
//        return unfinishedTasks;
//    }
//
//}
//
