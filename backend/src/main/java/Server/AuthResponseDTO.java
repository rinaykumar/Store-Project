package Server;

public class AuthResponseDTO {
    public final Boolean success;
    public final String error;

    public AuthResponseDTO(Boolean success, String error) {
        this.success = success;
        this.error = error;
    }
}