# Task Manager Application

A modern, full-stack task management application built with React, ASP.NET Core Web API, and SQLite. This project provides a comprehensive solution for team collaboration, project management, and task tracking.

## 🚀 Features

- **Task Management**: Create, edit, delete, and track tasks with status updates
- **Status Tracking**: Three task statuses (Pending, In Progress, Done) with visual indicators
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface built with React and Tailwind CSS
- **Real-time Updates**: Live updates for task status changes
- **RESTful API**: Clean API design with proper HTTP methods

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │    │ ASP.NET Core    │    │ SQLite Database │
│   (Frontend)    │◄──►│   Web API       │◄──►│   (Local)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **Backend**: ASP.NET Core 8, C#, Entity Framework Core
- **Database**: SQLite (local development)
- **Authentication**: JWT Bearer tokens (configured but not implemented)
- **Deployment**: Ready for Azure deployment
- **Testing**: Built-in testing support

## 📁 Project Structure

```
taskmanager/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Task.tsx    # Individual task component
│   │   │   ├── TaskForm.tsx # Task creation/editing form
│   │   │   └── ResponsiveVirtualizedList.tsx # Task list display
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service functions
│   │   ├── types/         # TypeScript type definitions
│   │   │   └── task.ts    # Task interfaces and enums
│   │   ├── utils/         # Utility functions
│   │   │   └── statusUtils.ts # Status styling utilities
│   │   └── App.tsx        # Main application component
│   ├── package.json
│   └── README.md
├── api/                    # ASP.NET Core Web API backend
│   ├── Controllers/       # API controllers
│   ├── Models/           # Data models
│   ├── Services/         # Business logic services
│   ├── Data/            # Database context and migrations
│   ├── TaskManager.API.csproj
│   ├── appsettings.json
│   └── README.md
├── docs/                   # Documentation
│   ├── README.md
│   ├── architecture.md
│   └── api-docs.md
├── sql/                    # Database schema and procedures
│   ├── schema.sql
│   ├── stored-procedures.sql
│   └── README.md
└── README.md
```

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+
- .NET 8 SDK
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskmanager
   ```

2. **Setup Backend**
   ```bash
   cd api
   dotnet restore
   dotnet run
   ```
   The API will be available at: http://localhost:5000

3. **Setup Frontend**
   ```bash
   cd client
   npm install
   npm run dev
   ```
   The frontend will be available at: http://localhost:5173

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/swagger

### Environment Configuration

#### Backend (ASP.NET Core)
The backend uses SQLite by default for local development. Configuration is in `api/appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=TaskManager.db"
  },
  "JwtSettings": {
    "SecretKey": "your-secret-key-here",
    "Issuer": "TaskManager",
    "Audience": "TaskManagerUsers"
  }
}
```

#### Frontend
Create `client/.env.local` if needed:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Task Manager
```

## 🧪 Testing

### Run Backend Tests
```bash
cd api
dotnet test
```

### Run Frontend Tests
```bash
cd client
npm test
```

## 🚀 Deployment

### Azure Deployment

1. **Setup Azure Resources**
   - Create Azure App Service (for API)
   - Create Azure Static Web App (for frontend)
   - Create Azure SQL Database (for production database)

2. **Configure Environment Variables**
   - Update connection strings for production database
   - Set JWT secret keys
   - Configure CORS settings

3. **Deploy**
   ```bash
   # Deploy Backend
   cd api
   dotnet publish -c Release
   # Deploy to Azure App Service
   
   # Deploy Frontend
   cd client
   npm run build
   # Deploy dist/ folder to Azure Static Web Apps
   ```

## 📚 Documentation

- [Architecture Decisions](./docs/architecture.md) - Technical decisions and rationale
- [API Documentation](./docs/api-docs.md) - Complete API reference
- [Database Schema](./sql/README.md) - Database design and stored procedures
- [Frontend Guide](./client/README.md) - React application guide
- [Backend Guide](./api/README.md) - ASP.NET Core API guide

## 🔧 Development

### Code Style

- **Frontend**: ESLint + TypeScript
- **Backend**: Built-in .NET formatting
- **Database**: Entity Framework Code First

### Git Workflow

1. Create feature branch from `main`
2. Make changes and add tests
3. Run linting and tests
4. Create pull request
5. Code review and merge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write tests for new features
- Update documentation
- Follow the existing code style
- Ensure all tests pass
- Add appropriate error handling

### Current Features
- ✅ Task CRUD operations
- ✅ Status management (Pending, In Progress, Done)
- ✅ Responsive design
- ✅ RESTful API
- ✅ SQLite database