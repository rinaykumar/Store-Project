package demo;

public class TransactionDTO {
    public final String item;
    public final double price;

    public TransactionDTO(String item, double price) {
        this.item = item;
        this.price = price;
    }
}