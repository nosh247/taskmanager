# Task Manager Frontend

A modern React-based frontend for the Task Manager API, built with TypeScript, Tailwind CSS, and Vite.

## Features

- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 📱 **Mobile Friendly**: Responsive layout that works on all devices
- 🌙 **Dark Mode**: Automatic dark mode support
- ⚡ **Fast**: Built with Vite for lightning-fast development
- 🔄 **Real-time Updates**: Instant UI updates when tasks are modified
- 📊 **Task Statistics**: Visual overview of task status distribution
- 🔍 **Filtering**: Filter tasks by status (All, Pending, In Progress, Done)
- ✏️ **CRUD Operations**: Create, Read, Update, and Delete tasks
- 🎯 **Status Management**: Quick status updates with dropdown selectors

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

### Filtering and Statistics
- **Status Filter**: Filter tasks by Pending, In Progress, Done, or view all
- **Statistics Cards**: See counts for total, pending, in-progress, and completed tasks
- **Real-time Updates**: Statistics update automatically when tasks change

## Styling

The application uses Tailwind CSS with custom components defined in `src/index.css`:

- `.btn-primary` - Primary action buttons (blue)
- `.btn-secondary` - Secondary action buttons (gray)
- `.input-field` - Form input styling
- `.card` - Task card containers

## Development

### Adding New Features

1. Create new components in the `components/` folder
2. Add TypeScript interfaces in the `types/` folder
3. Extend API services in `services/api.ts`
4. Update the main App component as needed

### Styling Guidelines

- Use Tailwind utility classes for styling
- Create custom components in `index.css` for reusable styles
- Follow the existing color scheme and spacing patterns
- Ensure responsive design for mobile devices

## Troubleshooting

### Common Issues

1. **API Connection Error**: Make sure the backend is running on `http://localhost:5000`
2. **CORS Errors**: The backend should have CORS configured (already done)
3. **Build Errors**: Check TypeScript types and ensure all dependencies are installed

### Development Tips

- Use the browser's developer tools to inspect network requests
- Check the console for any JavaScript errors
- Use React Developer Tools for component debugging

## Contributing

1. Follow the existing code structure and patterns
2. Use TypeScript for type safety
3. Add proper error handling for API calls
4. Test on different screen sizes for responsiveness
5. Update this README when adding new features

## License

This project is part of the Task Manager application.
