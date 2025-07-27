# Architecture Decisions

This document outlines the key architectural decisions made for the Task Manager application.

## 1. Technology Stack Selection

### Frontend: React + TypeScript + Tailwind CSS

**Selected**: React with TypeScript and Tailwind CSS for the frontend.

### Backend: ASP.NET Core Web API + C#

**Selected**: ASP.NET Core Web API with C# for the backend.

### Database: SQLite

**Selected**: SQLite for local development and data storage.

## 2. Authentication Strategy

### JWT Tokens

**Selected**: JWT tokens for authentication (configured but not implemented).

## 3. API Design

### RESTful API with ASP.NET Core

**Selected**: Use RESTful principles with ASP.NET Core controllers.

**API Structure**:
```
/api/tasks
/api/tasks/{id}
```

## 4. Database Design

### Entity Framework Code First

**Selected**: Use Entity Framework Core with Code First approach.

**Key Design Patterns**:
- Task entity with Id, Title, Description, DueDate, Status, CreatedBy, AssignedTo
- Status enum (Pending, In Progress, Done)
- Automatic timestamps for CreatedAt and UpdatedAt

## 5. Error Handling Strategy

### Standard HTTP Status Codes

**Selected**: Use standard HTTP status codes with consistent error responses.

## 6. CORS Configuration

### Development CORS

**Selected**: Allow all origins for development.

## 7. Testing Strategy

### Built-in Testing Support

**Selected**: Use built-in .NET testing framework for backend, Jest for frontend.

## 8. Deployment Strategy

### Azure Deployment Ready

**Selected**: Configured for Azure App Service (API) and Azure Static Web Apps (frontend).

## 9. Security Considerations

### Basic Security

**Selected**: HTTPS, input validation, JWT configuration.

## 10. Performance Optimization

### Simple Caching

**Selected**: Basic response caching where appropriate.

## 11. Monitoring and Logging

### Built-in Logging

**Selected**: Use ASP.NET Core built-in logging.

## 12. Current Implementation

### What's Built

- ✅ Task CRUD operations
- ✅ Status management (Pending, In Progress, Done)
- ✅ Responsive React frontend
- ✅ RESTful API endpoints
- ✅ SQLite database with Entity Framework
- ✅ Basic error handling
- ✅ Development CORS configuration 