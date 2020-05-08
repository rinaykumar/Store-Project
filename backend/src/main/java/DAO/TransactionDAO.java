package DAO;

import DTO.AddCartDTO;
import DTO.AddTransactionDTO;
import DTO.CartListDTO;
import DTO.TransactionListDTO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class TransactionDAO {
    private static TransactionDAO instance;

    Gson gson = new GsonBuilder()
            .create();

    private TransactionDAO(){

    }

    // Open connection
    MongoClient mongoClient = new MongoClient("localhost", 27017);

    public void addTransaction(String items[], double total) {
        // Connect to mongo
        MongoDatabase db = mongoClient.getDatabase("HW3Database");
        MongoCollection<Document> transactionCollection = db.getCollection("Transactions");

        // Create new DTO and convert to JSON
        AddTransactionDTO newTransactionDTO = new AddTransactionDTO(items, total);
        String transactionJSON = gson.toJson(newTransactionDTO);

        // Create new mongo Document from JSON
        Document newTransaction = Document.parse(transactionJSON);

        // Add Document to Collection
        transactionCollection.insertOne(newTransaction);
    }

    public TransactionListDTO getTransactions() {
        MongoDatabase db = mongoClient.getDatabase("HW3Database");
        MongoCollection<Document> cartCollection = db.getCollection("Transactions");
        List<String> cart = cartCollection.find().into(new ArrayList<>())
                .stream()
                .map(document -> {
                    document.remove("_id");
                    return document.toJson();
                })
                .collect(Collectors.toList());
        return new TransactionListDTO(cart);
    }

    public static TransactionDAO getInstance() {
        if(instance == null) {
            instance = new TransactionDAO();
        }
        return instance;
    }
}
