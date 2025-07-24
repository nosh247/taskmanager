# Task Manager API

ASP.NET Core Web API backend for the Task Manager application.

## Prerequisites

- .NET 8.0 SDK
- SQL Server LocalDB (included with Visual Studio) or SQL Server Express

## Setup

1. Navigate to the api folder:
```bash
cd api
```

2. Restore dependencies:
```bash
dotnet restore
```

3. Run the application:
```bash
dotnet run
```

The API will be available at:
- Swagger UI: https://localhost:7001/swagger
- API Base: https://localhost:7001/api

## Database

The application uses Entity Framework Core with SQL Server LocalDB. The database will be created automatically on first run.

Connection string: `Server=(localdb)\mssqllocaldb;Database=TaskManagerDB;Trusted_Connection=true;MultipleActiveResultSets=true`

## API Endpoints

- `GET /api/Tasks` - Get all tasks
- `GET /api/Tasks/{id}` - Get task by ID
- `POST /api/Tasks` - Create new task
- `PUT /api/Tasks/{id}` - Update task
- `DELETE /api/Tasks/{id}` - Delete task

## Task Model

```csharp
public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime? DueDate { get; set; }
    public TaskStatus Status { get; set; }
    public string CreatedBy { get; set; }
    public string AssignedTo { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
```

## Task Status Enum

- `Pending`
- `InProgress`
- `Done` 