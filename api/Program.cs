using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TaskManager.API.Data;
using TaskManager.API.Models;
using TaskManager.API.Services;
using dotenv.net;

// Load .env file
DotEnv.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add Entity Framework
builder.Services.AddDbContext<TaskManagerContext>(options =>
    options.UseSqlite(Environment.GetEnvironmentVariable("CONNECTION_STRING") ?? "Data Source=TaskManager.db"));

// Add JWT Service
builder.Services.AddScoped<IJwtService, JwtService>();

// Add Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER"),
        ValidAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE"),
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET") ?? throw new InvalidOperationException("JWT Secret not configured")))
    };
})
.AddGoogle(options =>
{
    var clientId = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_ID");
    var clientSecret = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_SECRET");

    if (!string.IsNullOrEmpty(clientId) && !string.IsNullOrEmpty(clientSecret))
    {
        options.ClientId = clientId;
        options.ClientSecret = clientSecret;
    }
})
.AddMicrosoftAccount(options =>
{
    var clientId = Environment.GetEnvironmentVariable("MICROSOFT_CLIENT_ID");
    var clientSecret = Environment.GetEnvironmentVariable("MICROSOFT_CLIENT_SECRET");

    if (!string.IsNullOrEmpty(clientId) && !string.IsNullOrEmpty(clientSecret))
    {
        options.ClientId = clientId;
        options.ClientSecret = clientSecret;
    }
});

// Add Authorization
builder.Services.AddAuthorization();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// Use CORS
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Ensure database is created and seed with mock data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<TaskManagerContext>();
    context.Database.EnsureCreated();
    
    // Seed mock data if no tasks exist
    if (!context.Tasks.Any())
    {
        var mockTasks = new List<TaskItem>
        {
            new TaskItem
            {
                Title = "Complete API Documentation",
                Description = "Write comprehensive documentation for the task manager API including all endpoints and examples",
                CreatedBy = "John Developer",
                AssignedTo = "Tech Lead",
                Status = TaskManager.API.Models.TaskStatus.InProgress,
                DueDate = DateTime.Now.AddDays(7),
                CreatedAt = DateTime.UtcNow.AddDays(-5)
            },
            new TaskItem
            {
                Title = "Design Database Schema",
                Description = "Create and review the database schema for the task management system",
                CreatedBy = "Sarah Architect",
                AssignedTo = "Database Team",
                Status = TaskManager.API.Models.TaskStatus.Done,
                DueDate = DateTime.Now.AddDays(-2),
                CreatedAt = DateTime.UtcNow.AddDays(-10),
                UpdatedAt = DateTime.UtcNow.AddDays(-2)
            },
            new TaskItem
            {
                Title = "Implement User Authentication",
                Description = "Add JWT-based authentication and authorization to the API",
                CreatedBy = "Mike Security",
                AssignedTo = "Security Team",
                Status = TaskManager.API.Models.TaskStatus.Pending,
                DueDate = DateTime.Now.AddDays(14),
                CreatedAt = DateTime.UtcNow.AddDays(-3)
            },
            new TaskItem
            {
                Title = "Create Frontend Dashboard",
                Description = "Build a React-based dashboard for task management with real-time updates",
                CreatedBy = "Lisa Frontend",
                AssignedTo = "UI/UX Team",
                Status = TaskManager.API.Models.TaskStatus.Pending,
                DueDate = DateTime.Now.AddDays(21),
                CreatedAt = DateTime.UtcNow.AddDays(-1)
            },
            new TaskItem
            {
                Title = "Setup CI/CD Pipeline",
                Description = "Configure automated testing and deployment pipeline using GitHub Actions",
                CreatedBy = "DevOps Team",
                AssignedTo = "DevOps Team",
                Status = TaskManager.API.Models.TaskStatus.InProgress,
                DueDate = DateTime.Now.AddDays(5),
                CreatedAt = DateTime.UtcNow.AddDays(-7),
                UpdatedAt = DateTime.UtcNow.AddDays(-1)
            }
        };
        
        context.Tasks.AddRange(mockTasks);
        context.SaveChanges();
    }
}

app.Run(); 