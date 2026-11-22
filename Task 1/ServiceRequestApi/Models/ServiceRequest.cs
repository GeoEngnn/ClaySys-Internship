namespace ServiceRequestApi.Models;

public class ServiceRequest
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public string? AssetTag { get; set; }

    public string Impact { get; set; } = string.Empty;

    public string Urgency { get; set; } = string.Empty;

    public string Priority { get; set; } = string.Empty;

    public DateTime? TargetDate { get; set; }

    public string Status { get; set; } = "Submitted";
}