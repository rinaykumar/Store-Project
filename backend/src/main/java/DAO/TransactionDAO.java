package DAO;

import DTO.TransListDTO;
import DTO.TransactionDTO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import com.mongodb.MongoClient;
import java.util.*;
import java.util.stream.Collectors;

public class TransactionDAO {

    private static TransactionDAO Instance;
    public static MongoClient mongoClient = new MongoClient("localhost", 27017);

    Gson gson = new GsonBuilder()
            .setPrettyPrinting()
            .disableHtmlEscaping()
            .create();

    public static TransactionDAO getInstance(){
        if(Instance == null){
            Instance = new TransactionDAO();
        }
        return Instance;
    }



    public static TransListDTO listTransaction() {
        MongoDatabase db = mongoClient.getDatabase("HW3Database");
        MongoCollection<Document> transactionCollection = db.getCollection("Transactions");

        // Grab Documents from Collection, remove _id field from Document, put into List<String>
        List<String> transactionList = transactionCollection.find().into(new ArrayList<>())
                .stream()
                .map(document -> {
                    document.remove("_id");
                    return document.toJson();
                })
                .collect(Collectors.toList());

        return  new TransListDTO(transactionList);
    }


    public void createTransaction(String item, double price, int quantity) {
        MongoDatabase db = mongoClient.getDatabase("HW3Database");
        MongoCollection<Document> transactionCollection = db.getCollection("Transactions");

        // Create new DTO and convert to JSON
        TransactionDTO transaction = new TransactionDTO(item, price, quantity);
        String transactionJSON = gson.toJson(transaction);

        // Create new mongo Document from JSON
        Document newTransaction = Document.parse(transactionJSON);

        // Add Document to Collection
        transactionCollection.insertOne(newTransaction);
    }
}
