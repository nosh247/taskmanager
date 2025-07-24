-- Task Manager Stored Procedures
-- SQL Server/Azure SQL Database

USE TaskManager;
GO

-- User Management Procedures

-- Get user by email
CREATE OR ALTER PROCEDURE sp_GetUserByEmail
    @Email NVARCHAR(255)
AS
BEGIN
    SELECT UserId, Email, FirstName, LastName, CreatedAt, IsActive
    FROM Users
    WHERE Email = @Email AND IsActive = 1;
END
GO

-- Create new user
CREATE OR ALTER PROCEDURE sp_CreateUser
    @Email NVARCHAR(255),
    @PasswordHash NVARCHAR(255),
    @FirstName NVARCHAR(100),
    @LastName NVARCHAR(100),
    @UserId INT OUTPUT
AS
BEGIN
    INSERT INTO Users (Email, PasswordHash, FirstName, LastName)
    VALUES (@Email, @PasswordHash, @FirstName, @LastName);
    
    SET @UserId = SCOPE_IDENTITY();
END
GO

-- Update user
CREATE OR ALTER PROCEDURE sp_UpdateUser
    @UserId INT,
    @FirstName NVARCHAR(100),
    @LastName NVARCHAR(100)
AS
BEGIN
    UPDATE Users
    SET FirstName = @FirstName,
        LastName = @LastName,
        UpdatedAt = GETUTCDATE()
    WHERE UserId = @UserId;
END
GO

-- Task Management Procedures

-- Get tasks by project
CREATE OR ALTER PROCEDURE sp_GetTasksByProject
    @ProjectId INT
AS
BEGIN
    SELECT 
        t.TaskId,
        t.Title,
        t.Description,
        t.Status,
        t.Priority,
        t.DueDate,
        t.CreatedAt,
        t.UpdatedAt,
        u.FirstName + ' ' + u.LastName AS AssignedToName,
        c.FirstName + ' ' + c.LastName AS CreatedByName
    FROM Tasks t
    LEFT JOIN Users u ON t.AssignedTo = u.UserId
    LEFT JOIN Users c ON t.CreatedBy = c.UserId
    WHERE t.ProjectId = @ProjectId AND t.IsActive = 1
    ORDER BY t.CreatedAt DESC;
END
GO

-- Get tasks by user
CREATE OR ALTER PROCEDURE sp_GetTasksByUser
    @UserId INT
AS
BEGIN
    SELECT 
        t.TaskId,
        t.Title,
        t.Description,
        t.Status,
        t.Priority,
        t.DueDate,
        t.CreatedAt,
        t.UpdatedAt,
        p.Name AS ProjectName,
        c.FirstName + ' ' + c.LastName AS CreatedByName
    FROM Tasks t
    LEFT JOIN Projects p ON t.ProjectId = p.ProjectId
    LEFT JOIN Users c ON t.CreatedBy = c.UserId
    WHERE t.AssignedTo = @UserId AND t.IsActive = 1
    ORDER BY t.DueDate ASC, t.CreatedAt DESC;
END
GO

-- Create new task
CREATE OR ALTER PROCEDURE sp_CreateTask
    @Title NVARCHAR(255),
    @Description NVARCHAR(MAX),
    @ProjectId INT,
    @AssignedTo INT,
    @CreatedBy INT,
    @Priority NVARCHAR(20),
    @DueDate DATETIME2,
    @TaskId INT OUTPUT
AS
BEGIN
    INSERT INTO Tasks (Title, Description, ProjectId, AssignedTo, CreatedBy, Priority, DueDate)
    VALUES (@Title, @Description, @ProjectId, @AssignedTo, @CreatedBy, @Priority, @DueDate);
    
    SET @TaskId = SCOPE_IDENTITY();
END
GO

-- Update task
CREATE OR ALTER PROCEDURE sp_UpdateTask
    @TaskId INT,
    @Title NVARCHAR(255),
    @Description NVARCHAR(MAX),
    @Status NVARCHAR(50),
    @Priority NVARCHAR(20),
    @DueDate DATETIME2,
    @AssignedTo INT
AS
BEGIN
    UPDATE Tasks
    SET Title = @Title,
        Description = @Description,
        Status = @Status,
        Priority = @Priority,
        DueDate = @DueDate,
        AssignedTo = @AssignedTo,
        UpdatedAt = GETUTCDATE()
    WHERE TaskId = @TaskId;
END
GO

-- Delete task (soft delete)
CREATE OR ALTER PROCEDURE sp_DeleteTask
    @TaskId INT
AS
BEGIN
    UPDATE Tasks
    SET IsActive = 0,
        UpdatedAt = GETUTCDATE()
    WHERE TaskId = @TaskId;
END
GO

-- Project Management Procedures

-- Get projects by user
CREATE OR ALTER PROCEDURE sp_GetProjectsByUser
    @UserId INT
AS
BEGIN
    SELECT 
        p.ProjectId,
        p.Name,
        p.Description,
        p.CreatedAt,
        p.UpdatedAt,
        u.FirstName + ' ' + u.LastName AS OwnerName,
        pm.Role AS UserRole
    FROM Projects p
    INNER JOIN ProjectMembers pm ON p.ProjectId = pm.ProjectId
    LEFT JOIN Users u ON p.OwnerId = u.UserId
    WHERE pm.UserId = @UserId AND p.IsActive = 1
    ORDER BY p.UpdatedAt DESC;
END
GO

-- Create new project
CREATE OR ALTER PROCEDURE sp_CreateProject
    @Name NVARCHAR(255),
    @Description NVARCHAR(MAX),
    @OwnerId INT,
    @ProjectId INT OUTPUT
AS
BEGIN
    BEGIN TRANSACTION;
    
    INSERT INTO Projects (Name, Description, OwnerId)
    VALUES (@Name, @Description, @OwnerId);
    
    SET @ProjectId = SCOPE_IDENTITY();
    
    -- Add owner as project member
    INSERT INTO ProjectMembers (ProjectId, UserId, Role)
    VALUES (@ProjectId, @OwnerId, 'Owner');
    
    COMMIT TRANSACTION;
END
GO

-- Add project member
CREATE OR ALTER PROCEDURE sp_AddProjectMember
    @ProjectId INT,
    @UserId INT,
    @Role NVARCHAR(50) = 'Member'
AS
BEGIN
    INSERT INTO ProjectMembers (ProjectId, UserId, Role)
    VALUES (@ProjectId, @UserId, @Role);
END
GO

-- Comment Management Procedures

-- Get comments by task
CREATE OR ALTER PROCEDURE sp_GetCommentsByTask
    @TaskId INT
AS
BEGIN
    SELECT 
        tc.CommentId,
        tc.Comment,
        tc.CreatedAt,
        u.FirstName + ' ' + u.LastName AS UserName
    FROM TaskComments tc
    INNER JOIN Users u ON tc.UserId = u.UserId
    WHERE tc.TaskId = @TaskId
    ORDER BY tc.CreatedAt ASC;
END
GO

-- Add comment to task
CREATE OR ALTER PROCEDURE sp_AddTaskComment
    @TaskId INT,
    @UserId INT,
    @Comment NVARCHAR(MAX),
    @CommentId INT OUTPUT
AS
BEGIN
    INSERT INTO TaskComments (TaskId, UserId, Comment)
    VALUES (@TaskId, @UserId, @Comment);
    
    SET @CommentId = SCOPE_IDENTITY();
END
GO

-- Dashboard Procedures

-- Get dashboard statistics
CREATE OR ALTER PROCEDURE sp_GetDashboardStats
    @UserId INT
AS
BEGIN
    -- Total tasks assigned to user
    SELECT COUNT(*) AS TotalTasks
    FROM Tasks
    WHERE AssignedTo = @UserId AND IsActive = 1;
    
    -- Tasks by status
    SELECT Status, COUNT(*) AS Count
    FROM Tasks
    WHERE AssignedTo = @UserId AND IsActive = 1
    GROUP BY Status;
    
    -- Overdue tasks
    SELECT COUNT(*) AS OverdueTasks
    FROM Tasks
    WHERE AssignedTo = @UserId 
      AND IsActive = 1 
      AND DueDate < GETUTCDATE() 
      AND Status NOT IN ('Completed', 'Cancelled');
    
    -- Recent projects
    SELECT TOP 5
        p.ProjectId,
        p.Name,
        p.UpdatedAt
    FROM Projects p
    INNER JOIN ProjectMembers pm ON p.ProjectId = pm.ProjectId
    WHERE pm.UserId = @UserId AND p.IsActive = 1
    ORDER BY p.UpdatedAt DESC;
END
GO 