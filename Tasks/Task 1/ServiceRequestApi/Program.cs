
using Microsoft.EntityFrameworkCore;
using ServiceRequestApi.Data;
using ServiceRequestApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);


builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("FrontendPolicy");

// POST: Create a service request
app.MapPost("/api/requests", async (ServiceRequest request, AppDbContext db) =>
{
    db.ServiceRequests.Add(request);

    await db.SaveChangesAsync();

    return Results.Created($"/api/requests/{request.Id}", request);
});

// GET: Retrieve all service requests
app.MapGet("/api/requests", async (AppDbContext db) =>
{
    return await db.ServiceRequests
        .AsNoTracking()
        .ToListAsync();
});

app.MapGet("/", () => "Service Request API is running!");

app.MapGet("/api", () => "You are on the API route page (❁´◡`❁)");

app.Run();
