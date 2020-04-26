package DAO;

import Server.ItemsListDTO;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ItemsDAO {

    private static ItemsDAO instance;

    private ItemsDAO(){

    }

    // Open connection
    MongoClient mongoClient = new MongoClient("localhost", 27017);

    public void addItem(String item) {
        MongoDatabase db = mongoClient.getDatabase("HW3Database");
        MongoCollection<Document> itemsCollection = db.getCollection("Items");
        Document newItem = new Document("item", item);
        itemsCollection.insertOne(newItem);
    }

    public void deleteItem(String item) {
        MongoDatabase db = mongoClient.getDatabase("HW3Database");
        MongoCollection<Document> itemsCollection = db.getCollection("Items");
        Document deleteItem = new Document("item", item);
        itemsCollection.findOneAndDelete(deleteItem);
    }

    public ItemsListDTO getAllItems() {
        MongoDatabase db = mongoClient.getDatabase("HW3Database");
        MongoCollection<Document> itemsCollection = db.getCollection("Items");
        List<String> items = itemsCollection.find().into(new ArrayList<>())
                .stream()
                .map(document -> {
                    return document.getString("item");
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