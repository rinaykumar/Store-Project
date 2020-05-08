package DTO;

public class AddTransactionDTO {
    public final String items[];
    public final double total;

    public AddTransactionDTO(String items[], double total) {
        this.items = items;
        this.total = total;
    }
}
