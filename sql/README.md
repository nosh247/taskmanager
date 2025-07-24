# Task Manager Database

SQL Server/Azure SQL Database schema and stored procedures for the Task Manager application.

## Database Setup

### Prerequisites
- SQL Server 2019+ or Azure SQL Database
- SQL Server Management Studio (SSMS) or Azure Data Studio

### Installation

1. **Create Database Schema**
   ```sql
   -- Run the schema.sql file to create all tables
   -- This will create the TaskManager database and all required tables
   ```

2. **Create Stored Procedures**
   ```sql
   -- Run the stored-procedures.sql file to create all stored procedures
   -- This includes procedures for user, task, project, and comment management
   ```

3. **Verify Installation**
   ```sql
   USE TaskManager;
   SELECT * FROM INFORMATION_SCHEMA.TABLES;
   SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_TYPE = 'PROCEDURE';
   ```

## Database Schema

### Tables

- **Users**: User accounts and authentication
- **Projects**: Project definitions and ownership
- **Tasks**: Task definitions, assignments, and status
- **TaskComments**: Comments on tasks
- **ProjectMembers**: Team collaboration and roles

### Key Features

- **Soft Deletes**: Records are marked as inactive rather than deleted
- **Audit Trail**: CreatedAt and UpdatedAt timestamps on all tables
- **Foreign Key Constraints**: Maintains data integrity
- **Indexes**: Optimized for common query patterns

## Stored Procedures

### User Management
- `sp_GetUserByEmail`: Retrieve user by email
- `sp_CreateUser`: Create new user account
- `sp_UpdateUser`: Update user profile

### Task Management
- `sp_GetTasksByProject`: Get all tasks for a project
- `sp_GetTasksByUser`: Get all tasks assigned to a user
- `sp_CreateTask`: Create new task
- `sp_UpdateTask`: Update task details
- `sp_DeleteTask`: Soft delete a task

### Project Management
- `sp_GetProjectsByUser`: Get all projects for a user
- `sp_CreateProject`: Create new project
- `sp_AddProjectMember`: Add user to project team

### Comments
- `sp_GetCommentsByTask`: Get all comments for a task
- `sp_AddTaskComment`: Add comment to task

### Dashboard
- `sp_GetDashboardStats`: Get user dashboard statistics

## Usage Examples

### Get User Tasks
```sql
EXEC sp_GetTasksByUser @UserId = 1;
```

### Create New Task
```sql
DECLARE @TaskId INT;
EXEC sp_CreateTask 
    @Title = 'Implement login feature',
    @Description = 'Add user authentication to the application',
    @ProjectId = 1,
    @AssignedTo = 2,
    @CreatedBy = 1,
    @Priority = 'High',
    @DueDate = '2024-02-15',
    @TaskId = @TaskId OUTPUT;
```

### Get Dashboard Stats
```sql
EXEC sp_GetDashboardStats @UserId = 1;
```

## Security Considerations

- Use parameterized queries (stored procedures) to prevent SQL injection
- Implement proper authentication and authorization
- Use connection pooling for better performance
- Consider encrypting sensitive data at rest
- Regular backup and recovery procedures

## Performance Optimization

- Indexes are created on frequently queried columns
- Stored procedures reduce network traffic
- Consider partitioning for large datasets
- Monitor query performance with SQL Server Profiler 