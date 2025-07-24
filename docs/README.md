# Task Manager Application

A comprehensive task management application built with React frontend, Azure Functions backend, and SQL Server database.

## 🚀 Features

- **User Authentication**: Secure login and registration
- **Project Management**: Create and manage projects with team collaboration
- **Task Management**: Create, assign, and track tasks with status updates
- **Team Collaboration**: Add team members to projects with different roles
- **Comments System**: Add comments to tasks for better communication
- **Dashboard**: Overview of tasks, projects, and statistics
- **Responsive Design**: Works on desktop and mobile devices

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │    │ Azure Functions │    │ SQL Server DB   │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack

- **Frontend**: React 18, TypeScript, Material-UI, Vite
- **Backend**: Azure Functions, Node.js, TypeScript
- **Database**: SQL Server/Azure SQL Database
- **Authentication**: JWT tokens
- **Deployment**: Azure (Functions + SQL Database)

## 📁 Project Structure

```
taskmanager/
├── client/                 # React frontend
│   ├── src/
│   ├── package.json
│   └── README.md
├── api/                    # Azure Functions backend
│   ├── src/
│   ├── host.json
│   ├── local.settings.json
│   ├── package.json
│   └── README.md
├── sql/                    # Database schema and procedures
│   ├── schema.sql
│   ├── stored-procedures.sql
│   └── README.md
├── docs/                   # Documentation
│   ├── README.md
│   ├── architecture.md
│   └── api-docs.md
├── tests/                  # Test suites
│   ├── client/
│   ├── api/
│   └── integration/
├── .github/workflows/      # CI/CD pipelines
│   ├── client-ci.yml
│   ├── api-ci.yml
│   └── deploy.yml
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+
- SQL Server 2019+ or Azure SQL Database
- Azure Functions Core Tools
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskmanager
   ```

2. **Setup Database**
   ```bash
   cd sql
   # Run schema.sql and stored-procedures.sql in your SQL Server instance
   ```

3. **Setup Backend**
   ```bash
   cd api
   npm install
   # Configure local.settings.json with your database connection string
   npm start
   ```

4. **Setup Frontend**
   ```bash
   cd client
   npm install
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:7071

## 🔧 Configuration

### Environment Variables

#### Backend (Azure Functions)
- `SQL_CONNECTION_STRING`: Database connection string
- `JWT_SECRET`: Secret for JWT token signing
- `CORS_ORIGIN`: Allowed CORS origins

#### Frontend
- `VITE_API_BASE_URL`: Backend API base URL
- `VITE_APP_NAME`: Application name

### Database Configuration

1. Create a SQL Server database
2. Run the schema and stored procedures from the `sql/` directory
3. Update the connection string in `api/local.settings.json`

## 🧪 Testing

### Run Tests

```bash
# Frontend tests
cd client
npm test

# Backend tests
cd api
npm test

# Integration tests
cd tests/integration
npm test
```

## 🚀 Deployment

### Azure Deployment

1. **Deploy Database**
   - Create Azure SQL Database
   - Run schema and stored procedures

2. **Deploy Backend**
   ```bash
   cd api
   func azure functionapp publish <function-app-name>
   ```

3. **Deploy Frontend**
   ```bash
   cd client
   npm run build
   # Deploy to Azure Static Web Apps or other hosting
   ```

### CI/CD Pipeline

The project includes GitHub Actions workflows for:
- Automated testing
- Code quality checks
- Deployment to Azure

## 📚 Documentation

- [Architecture Decisions](./architecture.md)
- [API Documentation](./api-docs.md)
- [Database Schema](./../sql/README.md)
- [Frontend Guide](./../client/README.md)
- [Backend Guide](./../api/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the architecture decisions 