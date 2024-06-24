package com.sustainability.mvp.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.sustainability.mvp.entity.Trivia;
import com.sustainability.mvp.entity.TriviaQuestions;
import com.sustainability.mvp.entity.TriviaQuestionDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ThreadLocalRandom;

// This annotation marks the class as a service component in Spring
@Service
public class TriviaService {

    // Method to find and return a list of trivia questions based on a given trivia ID
    public List<TriviaQuestionDTO> findQuestionsList(String triviaId) throws ExecutionException, InterruptedException {
        // Get the Firestore database instance
        Firestore dbFirestore = FirestoreClient.getFirestore();
        // Reference the specific document in the "Trivia" collection using the given trivia ID
        DocumentReference documentReference = dbFirestore.collection("Trivia").document(triviaId);
        // Asynchronously retrieve the document
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        // Get the document once the future completes
        DocumentSnapshot document = future.get();
        // Initialize an empty list to store trivia question DTOs
        List<TriviaQuestionDTO> questionDTOList = new ArrayList<>();
        // Check if the document exists
        if (document.exists()) {
            // Convert the document to a Trivia object
            Trivia trivia = document.toObject(Trivia.class);
            // Get the list of question IDs from the trivia object
            List<String> questionIds = trivia.getQuestionsId();
            // Iterate through each question ID
            for (String questionId : questionIds) {
                // Reference the specific document in the "TriviaQuestions" collection using the question ID
                DocumentReference questionDocRef = dbFirestore.collection("TriviaQuestions").document(questionId);
                // Asynchronously retrieve the question document
                ApiFuture<DocumentSnapshot> questionFuture = questionDocRef.get();
                // Get the question document once the future completes
                DocumentSnapshot questionDoc = questionFuture.get();
                // Check if the question document exists
                if (questionDoc.exists()) {
                    // Convert the question document to a TriviaQuestions object
                    TriviaQuestions triviaQuestion = questionDoc.toObject(TriviaQuestions.class);
                    // Create a new TriviaQuestionDTO object
                    TriviaQuestionDTO triviaQuestionDTO = new TriviaQuestionDTO();
                    // Set the question text in the DTO
                    triviaQuestionDTO.setQuestion(triviaQuestion.getQuestion());
                    // Set the options in the DTO
                    triviaQuestionDTO.setOptions(triviaQuestion.getOptions());
                    // Set the correct option in the DTO
                    triviaQuestionDTO.setCorrectOption(triviaQuestion.getAnswer());
                    // Set the correct answer message in the DTO
                    triviaQuestionDTO.setCorrectMessage(triviaQuestion.getDescription());
                    // Set the wrong answer message in the DTO
                    triviaQuestionDTO.setWrongMessage("Actually " + triviaQuestion.getDescription());
                    // Add the DTO to the list of question DTOs
                    questionDTOList.add(triviaQuestionDTO);
                }
            }
        }
        // Return the list of trivia question DTOs
        return questionDTOList;
    }

    // Method to get a random trivia ID from the "Trivia" collection
    public String getRandomTriviaId() throws ExecutionException, InterruptedException {
        // Get the Firestore database instance
        Firestore dbFirestore = FirestoreClient.getFirestore();
        // Reference the "Trivia" collection
        CollectionReference triviaCollection = dbFirestore.collection("Trivia");
        // Asynchronously retrieve all documents in the collection
        ApiFuture<QuerySnapshot> future = triviaCollection.get();
        // Initialize an empty list to store trivia IDs
        List<String> triviaIds = new ArrayList<>();
        // Get the query snapshot once the future completes
        QuerySnapshot querySnapshot = future.get();
        // Iterate through each document in the snapshot and add its ID to the list of trivia IDs
        querySnapshot.getDocuments().forEach(document -> triviaIds.add(document.getId()));
        // Generate a random index within the bounds of the list of trivia IDs
        int randomIndex = ThreadLocalRandom.current().nextInt(triviaIds.size());
        // Return the trivia ID at the random index
        return triviaIds.get(randomIndex);
    }
}
