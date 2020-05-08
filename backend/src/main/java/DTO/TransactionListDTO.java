package DTO;

import java.util.List;

public class TransactionListDTO {
    public final List<String> transactions;

    public TransactionListDTO(List<String> transactions) {
        this.transactions = transactions;
    }
}