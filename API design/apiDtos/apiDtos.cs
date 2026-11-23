namespace API_design.apiDtos;

// A DTO (Data Transfer Object) is an object used to transfer data between different parts of an application, particularly between the client and a backend API.

// A DTO defines the structure of data exchanged between your client and your backend API, including:
// - What fields are included.
// - What data type each field has.
// - Which fields are required or optional.
// - What validation rules apply to incoming data.

public record  ApiDtos(
    int Id,
    string Name,
    string Genre,
    decimal Price,
    DateOnly RealseDate
);

