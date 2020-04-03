package Server;

import static spark.Spark.*;

public class Server {
    public static void main(String[] args){
        port(4000);
        get("/hello", (req, res) -> {
            return "Hello world!";
        });
    }
}
