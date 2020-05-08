package DAO;

import DTO.AddCartDTO;
import DTO.CartListDTO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class CartDAO {
    private static CartDAO instance;

    Gson gson = new GsonBuilder()
            .create();

    private CartDAO(){

    }

    // Open connection
    MongoClient mongoClient = new MongoClient("localhost", 27017);

    public void addCart(String item, double price, double quantity) {
        // Connect to mongo
        MongoDatabase db = mongoClient.getDatabase("HW3Database");
        MongoCollection<Document> cartCollection = db.getCollection("Cart");

        // Create new DTO and convert to JSON
        AddCartDTO newCartDTO = new AddCartDTO(item, price, quantity, price*quantity);
        String cartJSON = gson.toJson(newCartDTO);

        // Create new mongo Document from JSON
        Document newCart = Document.parse(cartJSON);

        // Add Document to Collection
        cartCollection.insertOne(newCart);
    }

    public void deleteCart(String item, double price, double quantity) {
        // Connect to mongo
        MongoDatabase db = mongoClient.getDatabase("HW3Database");
        MongoCollection<Document> cartCollection = db.getCollection("Cart");

        // Create new DTO and convert to JSON
        AddCartDTO newCartDTO = new AddCartDTO(item, price, quantity, price*quantity);
        String cartJSON = gson.toJson(newCartDTO);

        // Create new mongo Document from JSON
        Document newCart = Document.parse(cartJSON);

        // Add Document to Collection
        cartCollection.findOneAndDelete(newCart);
    }

    public CartListDTO getCart() {
        MongoDatabase db = mongoClient.getDatabase("HW3Database");
        MongoCollection<Document> cartCollection = db.getCollection("Cart");
        List<String> cart = cartCollection.find().into(new ArrayList<>())
                .stream()
                .map(document -> {
                    document.remove("_id");
                    return document.toJson();
                })
                .collect(Collectors.toList());
        return new CartListDTO(cart);
    }

    public static CartDAO getInstance() {
        if(instance == null) {
            instance = new CartDAO();
        }
        return instance;
    }

}
