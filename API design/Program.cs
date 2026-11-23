using API_design.apiDtos;
using API_design.postApi;
const string GetGameEndpointName = "GetGame";

var builder = WebApplication.CreateBuilder(args);
// Think of it as a preparation stage where you configure your application before starting it.

// Database services.



// Authentication services.



// API controllers.



// Dependency injection services.

var app = builder.Build();
// I have finished configuring my application. Now construct the actual web application using those configurations.


// The routing system examines the incoming request and identifies:
// - HTTP method: GET
// - Request path: /students
// It compares these against the registered endpoint patterns.



List<ApiDtos> games = [
    new(
        1,
        "Street Fighter 2",
        "Fighting",
        19.99M,
        new DateOnly(1992, 7, 15)),

        new(
        2,
        "The Witcher 3",
        "RPG",
        39.99M,
        new DateOnly(2015, 5, 19)
    ),

    new(
        3,
        "Minecraft",
        "Sandbox",
        29.99M,
        new DateOnly(2011, 11, 18)
    )
];

// Get/games:

app.MapGet("/games", () => games);



// MapGet() defines an HTTP GET endpoint.
// "When someone sends a GET request to this endpoint, execute this function and return Hello World!"

// Get/games/1:

// The {id} is a route parameter. It represents a dynamic value that the client can provide through the URL.



app.MapGet("/games/{id}", (int id) => games.Find(game => game.Id ==id)).WithName(GetGameEndpointName); 

        // Take an individual game object and check whether its Id matches the requested id.


// Post/games 
app.MapPost("/games", (PostApi newGame) =>
{
    ApiDtos game =new(
        games.Count +1,
        newGame.Name,
        newGame.Genre,
        newGame.Price,
        newGame.RealseDate
    );
    games.Add(game);

    return Results.CreatedAtRoute(GetGameEndpointName,new{id=game.Id},game);

});




app.Run();
