using Microsoft.EntityFrameworkCore;
using TaskManager.API.Data;
using TaskManager.API.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Entity Framework
builder.Services.AddDbContext<TaskManagerContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
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