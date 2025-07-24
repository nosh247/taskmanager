# API Documentation

This document provides comprehensive API documentation for the Task Manager application.

## Base URL

- **Development**: `http://localhost:7071/api`
- **Production**: `https://your-function-app.azurewebsites.net/api`

## Authentication

All API endpoints (except authentication endpoints) require a valid JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": ["Additional error details"]
  }
}
```

Common error codes:
- `UNAUTHORIZED`: Invalid or missing authentication token
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid input data
- `INTERNAL_ERROR`: Server error

## Endpoints

### Authentication

#### POST /auth/register

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "user": {
    "userId": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST /auth/login

Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "user": {
    "userId": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Users

#### GET /users/{userId}

Get user profile.

**Response:**
```json
{
  "userId": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### PUT /users/{userId}

Update user profile.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith"
}
```

**Response:**
```json
{
  "userId": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Smith",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

### Projects

#### GET /projects

Get all projects for the authenticated user.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "projects": [
    {
      "projectId": 1,
      "name": "Website Redesign",
      "description": "Redesign company website",
      "ownerId": 1,
      "ownerName": "John Doe",
      "userRole": "Owner",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

#### POST /projects

Create a new project.

**Request Body:**
```json
{
  "name": "New Project",
  "description": "Project description"
}
```

**Response:**
```json
{
  "projectId": 2,
  "name": "New Project",
  "description": "Project description",
  "ownerId": 1,
  "createdAt": "2024-01-15T12:00:00Z",
  "updatedAt": "2024-01-15T12:00:00Z"
}
```

#### GET /projects/{projectId}

Get project details.

**Response:**
```json
{
  "projectId": 1,
  "name": "Website Redesign",
  "description": "Redesign company website",
  "ownerId": 1,
  "ownerName": "John Doe",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z",
  "members": [
    {
      "userId": 1,
      "firstName": "John",
      "lastName": "Doe",
      "role": "Owner",
      "joinedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### PUT /projects/{projectId}

Update project details.

**Request Body:**
```json
{
  "name": "Updated Project Name",
  "description": "Updated description"
}
```

#### DELETE /projects/{projectId}

Delete project (soft delete).

#### POST /projects/{projectId}/members

Add member to project.

**Request Body:**
```json
{
  "email": "member@example.com",
  "role": "Member"
}
```

### Tasks

#### GET /projects/{projectId}/tasks

Get all tasks for a project.

**Query Parameters:**
- `status` (optional): Filter by status
- `assignedTo` (optional): Filter by assigned user
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "tasks": [
    {
      "taskId": 1,
      "title": "Design Homepage",
      "description": "Create new homepage design",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2024-02-01T00:00:00Z",
      "assignedTo": 2,
      "assignedToName": "Jane Smith",
      "createdBy": 1,
      "createdByName": "John Doe",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

#### POST /projects/{projectId}/tasks

Create a new task.

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "assignedTo": 2,
  "priority": "Medium",
  "dueDate": "2024-02-15T00:00:00Z"
}
```

**Response:**
```json
{
  "taskId": 2,
  "title": "New Task",
  "description": "Task description",
  "projectId": 1,
  "assignedTo": 2,
  "createdBy": 1,
  "status": "Pending",
  "priority": "Medium",
  "dueDate": "2024-02-15T00:00:00Z",
  "createdAt": "2024-01-15T12:00:00Z",
  "updatedAt": "2024-01-15T12:00:00Z"
}
```

#### GET /tasks/{taskId}

Get task details.

**Response:**
```json
{
  "taskId": 1,
  "title": "Design Homepage",
  "description": "Create new homepage design",
  "projectId": 1,
  "projectName": "Website Redesign",
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2024-02-01T00:00:00Z",
  "assignedTo": 2,
  "assignedToName": "Jane Smith",
  "createdBy": 1,
  "createdByName": "John Doe",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### PUT /tasks/{taskId}

Update task details.

**Request Body:**
```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "Completed",
  "priority": "Low",
  "dueDate": "2024-02-20T00:00:00Z",
  "assignedTo": 3
}
```

#### DELETE /tasks/{taskId}

Delete task (soft delete).

### Comments

#### GET /tasks/{taskId}/comments

Get all comments for a task.

**Response:**
```json
{
  "comments": [
    {
      "commentId": 1,
      "comment": "Great progress on this task!",
      "userId": 1,
      "userName": "John Doe",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### POST /tasks/{taskId}/comments

Add comment to task.

**Request Body:**
```json
{
  "comment": "This is a new comment"
}
```

**Response:**
```json
{
  "commentId": 2,
  "comment": "This is a new comment",
  "userId": 1,
  "userName": "John Doe",
  "createdAt": "2024-01-15T12:00:00Z"
}
```

### Dashboard

#### GET /dashboard

Get dashboard statistics for the authenticated user.

**Response:**
```json
{
  "stats": {
    "totalTasks": 15,
    "overdueTasks": 3,
    "completedTasks": 8,
    "pendingTasks": 4
  },
  "tasksByStatus": [
    {
      "status": "Completed",
      "count": 8
    },
    {
      "status": "In Progress",
      "count": 4
    },
    {
      "status": "Pending",
      "count": 3
    }
  ],
  "recentProjects": [
    {
      "projectId": 1,
      "name": "Website Redesign",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## Data Types

### Task Status
- `Pending`
- `In Progress`
- `Completed`
- `Cancelled`

### Task Priority
- `Low`
- `Medium`
- `High`
- `Critical`

### User Roles
- `Owner`
- `Admin`
- `Member`
- `Viewer`

## Rate Limiting

API endpoints are rate limited to prevent abuse:
- 100 requests per minute per IP address
- 1000 requests per hour per authenticated user

## CORS

CORS is configured to allow requests from:
- Development: `http://localhost:5173`
- Production: `https://your-frontend-domain.com`

## OpenAPI/Swagger Specification

The API also provides an OpenAPI specification at:
- `/api/swagger.json` - OpenAPI specification
- `/api/docs` - Swagger UI documentation (if configured) 