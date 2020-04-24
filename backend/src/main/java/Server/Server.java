package Server;

import static spark.Spark.*;
import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.ArrayList;
import java.util.List;

public class Server {
    public static void main(String[] args){
        // open connection
        MongoClient mongoClient = new MongoClient("localhost", 27017);
        // get ref to database
        MongoDatabase db = mongoClient.getDatabase("HW3Database");
        // get ref to collection
        MongoCollection<Document> userCollection = db.getCollection("Users");

        List<Document> potentialUser1 = userCollection.find(new Document("username", "user"))
                .into(new ArrayList<>());

        if (potentialUser1.isEmpty()) {
            // Add user for store view
            Document newUser = new Document()
                    .append("username", "user")
                    .append ("password", "password");

            userCollection.insertOne(newUser);
        }

        List<Document> potentialAdmin = userCollection.find(new Document("username", "admin"))
                .into(new ArrayList<>());

        if (potentialAdmin.isEmpty()) {
            // Add admin for management view
            Document newAdmin = new Document()
                    .append("username", "admin")
                    .append ("password", "root");

            userCollection.insertOne(newAdmin);
        }

        // Init Gson
        Gson gson = new Gson();

        port(4000);

        // 2 way communication
        webSocket("/ws", WebSocketHandler.class); // open socket and leave it open
        get("/hello", (req, res) -> "hi"); // test

        post("/api/authenticate", (req, res) -> {
            String bodyString =   req.body();
            AuthDTO authDTO = gson.fromJson(bodyString, AuthDTO.class);
            List<Document> potentialUser = userCollection.find(new Document("username", authDTO.username))
                    .into(new ArrayList<>());
            if (potentialUser.size() != 1) {
                AuthResponseDTO responseDTO =
                        new AuthResponseDTO(false, "User not found");
                return gson.toJson(responseDTO);
            }
            Document userDocument = potentialUser.get(0);
            if (!userDocument.getString("password").equals(authDTO.password)) {
                AuthResponseDTO responseDTO =
                        new AuthResponseDTO(false, "Password is incorrect");
                return gson.toJson(responseDTO);
            }
            AuthResponseDTO responseDTO =
                    new AuthResponseDTO(true, null);
            return gson.toJson(responseDTO);
        });
    }
}
