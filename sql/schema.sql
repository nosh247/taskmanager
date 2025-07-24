-- Task Manager Database Schema
-- SQL Server/Azure SQL Database

-- Create database (if not exists)
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'TaskManager')
BEGIN
    CREATE DATABASE TaskManager;
END
GO

USE TaskManager;
GO

-- Users table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
BEGIN
    CREATE TABLE Users (
        UserId INT IDENTITY(1,1) PRIMARY KEY,
        Email NVARCHAR(255) NOT NULL UNIQUE,
        PasswordHash NVARCHAR(255) NOT NULL,
        FirstName NVARCHAR(100) NOT NULL,
        LastName NVARCHAR(100) NOT NULL,
        CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
        UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
        IsActive BIT DEFAULT 1
    );
END
GO

-- Projects table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Projects')
BEGIN
    CREATE TABLE Projects (
        ProjectId INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX),
        OwnerId INT NOT NULL,
        CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
        UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
        IsActive BIT DEFAULT 1,
        FOREIGN KEY (OwnerId) REFERENCES Users(UserId)
    );
END
GO

-- Tasks table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Tasks')
BEGIN
    CREATE TABLE Tasks (
        TaskId INT IDENTITY(1,1) PRIMARY KEY,
        Title NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX),
        ProjectId INT,
        AssignedTo INT,
        CreatedBy INT NOT NULL,
        Status NVARCHAR(50) DEFAULT 'Pending',
        Priority NVARCHAR(20) DEFAULT 'Medium',
        DueDate DATETIME2,
        CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
        UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
        IsActive BIT DEFAULT 1,
        FOREIGN KEY (ProjectId) REFERENCES Projects(ProjectId),
        FOREIGN KEY (AssignedTo) REFERENCES Users(UserId),
        FOREIGN KEY (CreatedBy) REFERENCES Users(UserId)
    );
END
GO

-- TaskComments table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'TaskComments')
BEGIN
    CREATE TABLE TaskComments (
        CommentId INT IDENTITY(1,1) PRIMARY KEY,
        TaskId INT NOT NULL,
        UserId INT NOT NULL,
        Comment NVARCHAR(MAX) NOT NULL,
        CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
        FOREIGN KEY (TaskId) REFERENCES Tasks(TaskId),
        FOREIGN KEY (UserId) REFERENCES Users(UserId)
    );
END
GO

-- ProjectMembers table (for team collaboration)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'ProjectMembers')
BEGIN
    CREATE TABLE ProjectMembers (
        ProjectId INT NOT NULL,
        UserId INT NOT NULL,
        Role NVARCHAR(50) DEFAULT 'Member',
        JoinedAt DATETIME2 DEFAULT GETUTCDATE(),
        PRIMARY KEY (ProjectId, UserId),
        FOREIGN KEY (ProjectId) REFERENCES Projects(ProjectId),
        FOREIGN KEY (UserId) REFERENCES Users(UserId)
    );
END
GO

-- Create indexes for better performance
CREATE INDEX IX_Tasks_ProjectId ON Tasks(ProjectId);
CREATE INDEX IX_Tasks_AssignedTo ON Tasks(AssignedTo);
CREATE INDEX IX_Tasks_Status ON Tasks(Status);
CREATE INDEX IX_Tasks_DueDate ON Tasks(DueDate);
CREATE INDEX IX_TaskComments_TaskId ON TaskComments(TaskId);
CREATE INDEX IX_ProjectMembers_ProjectId ON ProjectMembers(ProjectId);
CREATE INDEX IX_ProjectMembers_UserId ON ProjectMembers(UserId); 