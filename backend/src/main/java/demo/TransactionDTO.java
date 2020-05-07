package demo;

public class TransactionDTO {
    public final String item;
    public final double price;
    public final String username;

    public TransactionDTO(String item, double price, String username) {
        this.item = item;
        this.price = price;
        this.username=username;
    }
}