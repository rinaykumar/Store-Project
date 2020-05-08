package DTO;

public class AddCartDTO {
    public final String item;
    public final double price;
    public final double quantity;
    public final double subtotal;

    public AddCartDTO(String item, double price, double quantity, double subtotal) {
        this.item = item;
        this.price = price;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }
}
