package Server;

public class AddItemDTO {
    public final String item;
    public final double price;

    public AddItemDTO(String item, double price) {
        this.item = item;
        this.price = price;
    }
}
