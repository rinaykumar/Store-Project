package demo;

import static spark.Spark.*;

import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class SparkDemo {
  public static void main(String[] args) {
    // open connection
    MongoClient mongoClient = new MongoClient("localhost", 27017);
    // get ref to database
    MongoDatabase db = mongoClient.getDatabase("HW3Database");
    // get ref to collection
    MongoCollection<Document> userCollection = db.getCollection("Users");

    Gson gson = new Gson();

    port(1235);
    // 2 way communication
    webSocket("/ws", WebSocketHandler.class); // open socket and leave it open
    get("/hello", (req, res) -> "hi"); // test

    post("/api/authenticate", (req, res)->{
      String bodyString = req.body();
      AuthDto authDto = gson.fromJson(bodyString, AuthDto.class);
      List<Document> potentialUser = userCollection.find(new Document("username", authDto.username))
              .into(new ArrayList<>());
      if(potentialUser.size() != 1){
        AuthResponseDto responseDto = new AuthResponseDto(false, "User not found");
        return gson.toJson(responseDto);
      }
      Document userDocument = potentialUser.get(0);
      if(!userDocument.getString("password").equals(authDto.password)){
        AuthResponseDto responseDto = new AuthResponseDto(false, "Password is incorrect");
        return gson.toJson(responseDto);
      }
      AuthResponseDto responseDto = new AuthResponseDto(true, "null");
      return gson.toJson(responseDto);
    });

    post("/api/register", (req, res) -> {
      String bodyString = req.body();
      AuthDto authDto = gson.fromJson(bodyString, AuthDto.class);

      List<Document> potentialUser = userCollection.find(new Document("username", authDto.username))
              .into(new ArrayList<>());

      if(!potentialUser.isEmpty()){
        AuthResponseDto authResponseDto = new AuthResponseDto(false, "User already exists");
        return gson.toJson(authResponseDto);
      }

      Document newUser = new Document()
              .append("username", authDto.username)
              .append("password", authDto.password);
      userCollection.insertOne(newUser);
      AuthResponseDto authResponseDto = new AuthResponseDto(true, null);
      return gson.toJson(authResponseDto);
    });

    post("/api/createTrans", (req,res) -> {
        String bodyString = req.body();
        TransactionDTO transactionDTO = gson.fromJson(bodyString, TransactionDTO.class);

        TransactionDAO TransDAO = TransactionDAO.getInstance();
        TransDAO.createTransaction(transactionDTO.item,transactionDTO.price,transactionDTO.username);
    return "tran created successfully";
    });

    post("/api/getTrans", (req,res) -> {
        //String bodyString = req.body();
        //TransactionDTO transactionDTO = gson.fromJson(bodyString, TransactionDTO.class);

        //TransactionDAO TransDAO = TransactionDAO.getInstance();
        TransactionDAO.listTransaction();
    return "retrieving all trans";
    });
  }
}
