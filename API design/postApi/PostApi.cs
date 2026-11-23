namespace API_design.postApi;

public record PostApi(
    string Name,
    string Genre,
    decimal Price,
    DateOnly RealseDate
);
