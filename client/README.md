# Task Manager Frontend

React-based task manager with responsive UI.

## Features

- 🎨 **UI**: Responsive design with Tailwind CSS
- 📱 **Mobile Friendly**: Responsive layout that works on all devices
- 🔍 **Filtering**: Filter tasks by status (All, Pending, In Progress, Done)
- ✏️ **CRUD Operations**: Create, Read, Update, and Delete tasks

## Tech Stack

- **React 19** - Latest React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API communication

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see API folder for setup)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Project Structure

```
src/
├── components/          # React components
│   ├── Task.tsx        # Individual task display component
│   └── TaskForm.tsx    # Form for creating/editing tasks
├── services/           # API services
│   └── api.ts         # Axios configuration and API calls
├── types/             # TypeScript type definitions
│   └── task.ts        # Task-related interfaces and enums
├── App.tsx            # Main application component
├── index.css          # Global styles with Tailwind directives
└── main.tsx           # Application entry point
```

## API Integration

The frontend connects to the backend API at `http://localhost:5000/api`. Make sure your backend is running before using the frontend.

### Available Endpoints

- `GET /api/Tasks` - Get all tasks
- `GET /api/Tasks/{id}` - Get a specific task
- `POST /api/Tasks` - Create a new task
- `PUT /api/Tasks/{id}` - Update a task
- `DELETE /api/Tasks/{id}` - Delete a task

## Features in Detail

### Task Management
- **Create Tasks**: Click "Add New Task" to open a modal form
- **Edit Tasks**: Click the "Edit" button on any task card
- **Delete Tasks**: Click the "Delete" button (with confirmation)
- **Status Updates**: Use the dropdown on each task to change status

### Task Information
Each task displays:
- Title and description
- Created by and assigned to
- Due date (if set)
- Current status with color coding
- Creation and update timestamps
