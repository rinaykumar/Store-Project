package DTO;

public class TransactionDTO {
    public final String item;
    public final double price;
    public final int    quantity;

    public TransactionDTO(String item, double price, int quantity) {
        this.item = item;
        this.price = price;
        this.quantity = quantity;
    }
}