# Testing Strategy

This document outlines the testing strategy for the Task Manager application.

## Testing Pyramid

```
    /\
   /  \     E2E Tests (Few)
  /____\    Integration Tests (Some)
 /______\   Unit Tests (Many)
```

## Test Structure

```
tests/
├── client/           # Frontend tests
│   ├── unit/        # Component and utility tests
│   ├── integration/ # Component integration tests
│   └── e2e/         # End-to-end tests
├── api/              # Backend tests
│   ├── unit/        # Function and service tests
│   ├── integration/ # API endpoint tests
│   └── e2e/         # Full API workflow tests
└── integration/      # Cross-component tests
    ├── api-client/   # API client integration
    └── database/     # Database integration tests
```

## Frontend Testing (React)

### Unit Tests

**Framework**: Jest + React Testing Library

**Coverage**: Components, hooks, utilities, services

**Example Test**:
```typescript
import { render, screen } from '@testing-library/react';
import { TaskCard } from '../components/TaskCard';

describe('TaskCard', () => {
  it('displays task title and description', () => {
    const task = {
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
      status: 'Pending'
    };

    render(<TaskCard task={task} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
```

### Integration Tests

**Coverage**: Component interactions, form submissions, API calls

**Example Test**:
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TaskForm } from '../components/TaskForm';
import { mockApi } from '../mocks/api';

describe('TaskForm', () => {
  it('submits form and calls API', async () => {
    const mockSubmit = jest.fn();
    mockApi.createTask.mockResolvedValue({ id: 1 });

    render(<TaskForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'New Task' }
    });
    
    fireEvent.click(screen.getByText('Create Task'));
    
    await waitFor(() => {
      expect(mockApi.createTask).toHaveBeenCalledWith({
        title: 'New Task'
      });
    });
  });
});
```

### E2E Tests

**Framework**: Playwright or Cypress

**Coverage**: Complete user workflows

**Example Test**:
```typescript
import { test, expect } from '@playwright/test';

test('user can create and complete a task', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', 'user@example.com');
  await page.fill('[data-testid="password"]', 'password');
  await page.click('[data-testid="login-button"]');
  
  await page.waitForURL('/dashboard');
  await page.click('[data-testid="create-task-button"]');
  
  await page.fill('[data-testid="task-title"]', 'New Task');
  await page.click('[data-testid="save-task"]');
  
  await expect(page.locator('text=New Task')).toBeVisible();
});
```

## Backend Testing (Azure Functions)

### Unit Tests

**Framework**: Jest

**Coverage**: Individual functions, utilities, services

**Example Test**:
```typescript
import { createTask } from '../functions/tasks';
import { mockContext } from '../mocks/context';

describe('createTask', () => {
  it('creates a new task successfully', async () => {
    const request = {
      body: {
        title: 'Test Task',
        description: 'Test Description',
        projectId: 1
      }
    };

    const result = await createTask(mockContext, request);
    
    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty('taskId');
    expect(result.body.title).toBe('Test Task');
  });
});
```

### Integration Tests

**Framework**: Jest + Supertest

**Coverage**: API endpoints with database integration

**Example Test**:
```typescript
import request from 'supertest';
import { app } from '../app';
import { setupTestDatabase, cleanupTestDatabase } from '../test-utils';

describe('Tasks API', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  afterAll(async () => {
    await cleanupTestDatabase();
  });

  it('GET /api/tasks returns user tasks', async () => {
    const token = await getAuthToken();
    
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('tasks');
    expect(Array.isArray(response.body.tasks)).toBe(true);
  });
});
```

### E2E Tests

**Coverage**: Complete API workflows

**Example Test**:
```typescript
describe('Task Management Workflow', () => {
  it('complete task lifecycle', async () => {
    // 1. Create project
    const project = await createProject({
      name: 'Test Project',
      description: 'Test Description'
    });

    // 2. Create task
    const task = await createTask({
      title: 'Test Task',
      projectId: project.id
    });

    // 3. Update task status
    const updatedTask = await updateTask(task.id, {
      status: 'In Progress'
    });

    // 4. Complete task
    const completedTask = await updateTask(task.id, {
      status: 'Completed'
    });

    expect(completedTask.status).toBe('Completed');
  });
});
```

## Database Testing

### Test Database Setup

**Strategy**: Use separate test database with migrations

**Example Setup**:
```typescript
import { sql } from '../database';

export async function setupTestDatabase() {
  // Create test database
  await sql`CREATE DATABASE TestTaskManager`;
  
  // Run migrations
  await runMigrations('TestTaskManager');
  
  // Seed test data
  await seedTestData();
}

export async function cleanupTestDatabase() {
  await sql`DROP DATABASE TestTaskManager`;
}
```

### Stored Procedure Tests

**Example Test**:
```typescript
import { executeStoredProcedure } from '../database';

describe('Stored Procedures', () => {
  it('sp_CreateTask creates task successfully', async () => {
    const result = await executeStoredProcedure('sp_CreateTask', {
      title: 'Test Task',
      description: 'Test Description',
      projectId: 1,
      createdBy: 1
    });

    expect(result.taskId).toBeDefined();
    expect(result.taskId).toBeGreaterThan(0);
  });
});
```

## Test Configuration

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### Playwright Configuration

```typescript
// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'Chrome',
      use: { browserName: 'chromium' }
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' }
    }
  ]
};

export default config;
```

## Running Tests

### Frontend Tests

```bash
# Unit tests
npm test

# Unit tests with coverage
npm run test:coverage

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# All tests
npm run test:all
```

### Backend Tests

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# All tests
npm run test:all
```

### Database Tests

```bash
# Database tests only
npm run test:database

# All tests including database
npm run test:full
```

## Continuous Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      sqlserver:
        image: mcr.microsoft.com/mssql/server:2019-latest
        env:
          SA_PASSWORD: TestPassword123
          ACCEPT_EULA: Y
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          npm ci
          cd client && npm ci
          cd ../api && npm ci
          
      - name: Run database tests
        run: npm run test:database
        
      - name: Run backend tests
        run: cd api && npm test
        
      - name: Run frontend tests
        run: cd client && npm test
        
      - name: Run E2E tests
        run: npm run test:e2e
```

## Best Practices

### Test Organization

1. **Arrange-Act-Assert**: Structure tests with clear sections
2. **Descriptive Names**: Use clear, descriptive test names
3. **Single Responsibility**: Each test should test one thing
4. **Independent Tests**: Tests should not depend on each other

### Test Data Management

1. **Factories**: Use factories to create test data
2. **Fixtures**: Store common test data in fixtures
3. **Cleanup**: Always clean up test data after tests
4. **Isolation**: Each test should have its own data

### Mocking Strategy

1. **External Dependencies**: Mock external APIs and services
2. **Database**: Use test database for integration tests
3. **Time**: Mock time-dependent operations
4. **Random Values**: Mock random values for deterministic tests

### Performance Testing

1. **Load Testing**: Test API performance under load
2. **Database Performance**: Test query performance
3. **Frontend Performance**: Test component rendering performance
4. **Memory Leaks**: Test for memory leaks in long-running operations 