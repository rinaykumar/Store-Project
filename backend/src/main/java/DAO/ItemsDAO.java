package DAO;

import Server.AddItemDTO;
import Server.ItemsListDTO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ItemsDAO {

    private static ItemsDAO instance;

    Gson gson = new GsonBuilder()
            .create();

    private ItemsDAO(){

    }

    // Open connection
    MongoClient mongoClient = new MongoClient("localhost", 27017);

    public void addItem(String item, double price) {
        // Connect to mongo
        MongoDatabase db = mongoClient.getDatabase("HW3Database");
        MongoCollection<Document> itemsCollection = db.getCollection("Items");

        // Create new DTO and convert to JSON
        AddItemDTO newItemDTO = new AddItemDTO(item, price);
        String itemJSON = gson.toJson(newItemDTO);

        // Create new mongo Document from JSON
        Document newItem = Document.parse(itemJSON);

        // Add Document to Collection
        itemsCollection.insertOne(newItem);
    }

    public void deleteItem(String item, double price) {
        // Connect to mongo
        MongoDatabase db = mongoClient.getDatabase("HW3Database");
        MongoCollection<Document> itemsCollection = db.getCollection("Items");

        // Create new DTO and convert to JSON
        AddItemDTO newItemDTO = new AddItemDTO(item, price);
        String itemJSON = gson.toJson(newItemDTO);

        // Create new mongo Document from JSON
        Document newItem = Document.parse(itemJSON);

        // Delete Document from Collections
        itemsCollection.findOneAndDelete(newItem);
    }

    public ItemsListDTO getAllItems() {
        MongoDatabase db = mongoClient.getDatabase("HW3Database");
        MongoCollection<Document> itemsCollection = db.getCollection("Items");
        List<String> items = itemsCollection.find().into(new ArrayList<>())
                .stream()
                .map(document -> {
                    document.remove("_id");
                    return document.toJson();
                })
                .collect(Collectors.toList());
        return new ItemsListDTO(items);
    }

    public static ItemsDAO getInstance() {
        if(instance == null) {
            instance = new ItemsDAO();
        }
        return instance;
    }
}