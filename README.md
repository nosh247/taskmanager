# Task Manager Application

A modern, full-stack task management application built with React, Azure Functions, and SQL Server. This project provides a comprehensive solution for team collaboration, project management, and task tracking.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication system
- **Project Management**: Create and manage projects with team collaboration
- **Task Management**: Create, assign, and track tasks with status updates
- **Team Collaboration**: Add team members to projects with different roles
- **Comments System**: Add comments to tasks for better communication
- **Dashboard**: Overview of tasks, projects, and statistics
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Live updates for task status changes

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
- **Deployment**: Azure (Functions + SQL Database + Static Web Apps)
- **Testing**: Jest, React Testing Library, Playwright
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
taskmanager/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service functions
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   ├── package.json
│   └── README.md
├── api/                    # Azure Functions backend
│   ├── src/
│   │   ├── functions/     # Azure Functions
│   │   ├── shared/        # Shared utilities and middleware
│   │   ├── models/        # Data models and types
│   │   └── services/      # Business logic services
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

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+
- SQL Server 2019+ or Azure SQL Database
- Azure Functions Core Tools
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskmanager
   ```

2. **Setup Database**
   ```bash
   # Run schema.sql and stored-procedures.sql in your SQL Server instance
   # Or use Azure SQL Database
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

### Environment Configuration

#### Backend (Azure Functions)
Create `api/local.settings.json`:
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "SQL_CONNECTION_STRING": "your_connection_string_here",
    "JWT_SECRET": "your_jwt_secret_here"
  }
}
```

#### Frontend
Create `client/.env.local`:
```env
VITE_API_BASE_URL=http://localhost:7071/api
VITE_APP_NAME=Task Manager
```

## 🧪 Testing

### Run All Tests
```bash
# Frontend tests
cd client && npm test

# Backend tests
cd api && npm test

# Integration tests
npm run test:integration
```

### Test Coverage
```bash
# Frontend coverage
cd client && npm run test:coverage

# Backend coverage
cd api && npm run test:coverage
```

## 🚀 Deployment

### Azure Deployment

1. **Setup Azure Resources**
   - Create Azure SQL Database
   - Create Azure Functions App
   - Create Azure Static Web App

2. **Configure GitHub Secrets**
   ```bash
   AZURE_CREDENTIALS
   AZURE_FUNCTIONAPP_PUBLISH_PROFILE
   AZURE_STATIC_WEB_APPS_API_TOKEN
   AZURE_RESOURCE_GROUP
   AZURE_SQL_SERVER
   AZURE_SQL_USERNAME
   AZURE_SQL_PASSWORD
   ```

3. **Deploy**
   ```bash
   # Manual deployment
   git push origin main
   
   # Or trigger deployment workflow
   # Go to GitHub Actions and run "Deploy to Azure"
   ```

### Manual Deployment

```bash
# Deploy Backend
cd api
func azure functionapp publish <function-app-name>

# Deploy Frontend
cd client
npm run build
# Upload dist/ folder to Azure Static Web Apps
```

## 📚 Documentation

- [Architecture Decisions](./docs/architecture.md) - Technical decisions and rationale
- [API Documentation](./docs/api-docs.md) - Complete API reference
- [Database Schema](./sql/README.md) - Database design and stored procedures
- [Frontend Guide](./client/README.md) - React application guide
- [Backend Guide](./api/README.md) - Azure Functions guide
- [Testing Strategy](./tests/README.md) - Testing approach and examples

## 🔧 Development

### Code Style

- **Frontend**: ESLint + Prettier
- **Backend**: ESLint + Prettier
- **Database**: SQL Server best practices

### Git Workflow

1. Create feature branch from `develop`
2. Make changes and add tests
3. Run linting and tests
4. Create pull request
5. Code review and merge

### Commit Convention

```
feat: add user authentication
fix: resolve task creation issue
docs: update API documentation
style: format code with prettier
refactor: improve database queries
test: add unit tests for auth service
```

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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- 📖 Check the [documentation](./docs/)
- 🐛 Create an [issue](../../issues)
- 💬 Join our [discussions](../../discussions)
- 📧 Contact: support@taskmanager.com

## 🗺️ Roadmap

### Upcoming Features

- [ ] Real-time notifications
- [ ] File attachments
- [ ] Time tracking
- [ ] Advanced reporting
- [ ] Mobile app
- [ ] API rate limiting
- [ ] Multi-language support

### Performance Improvements

- [ ] Database query optimization
- [ ] Frontend code splitting
- [ ] CDN integration
- [ ] Caching strategies

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Azure Functions](https://azure.microsoft.com/services/functions/) - Serverless backend
- [Material-UI](https://mui.com/) - UI component library
- [SQL Server](https://www.microsoft.com/sql-server) - Database
- [GitHub Actions](https://github.com/features/actions) - CI/CD
