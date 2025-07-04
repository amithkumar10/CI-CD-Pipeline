# 📋 Full-Stack Todo List Application

A beautiful, feature-rich todo list application built with React, Node.js, Express, and MongoDB. This application demonstrates modern full-stack development practices with a clean, responsive design.

## ✨ Features

- **Modern UI**: Clean, responsive design with smooth animations
- **Full CRUD Operations**: Create, read, update, and delete todos
- **Task Management**: Mark tasks as complete/incomplete
- **Filtering**: Filter tasks by status (All, Completed, Pending)
- **Edit in Place**: Click edit button to modify todos inline
- **Statistics**: View task counts and completion status
- **Error Handling**: Comprehensive error handling and user feedback
- **Real-time Updates**: Instant UI updates with backend synchronization

## 🏗️ Architecture

```
todo-app/
├── src/             # React frontend (Vite + TypeScript)
├── server/          # Node.js backend (Express + MongoDB)
├── README.md        # This file
└── package.json     # Frontend package.json
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API calls

### Backend
- **Node.js** with ES modules
- **Express.js** web framework
- **MongoDB** with Mongoose ODM
- **CORS** for cross-origin requests
- **dotenv** for environment variables

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (v18 or higher)
- MongoDB (v5 or higher) - either locally or MongoDB Atlas
- npm or yarn

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd todo-app

# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install
```

### 2. Database Setup

#### Option A: Local MongoDB
1. **Install and start MongoDB locally**:
   ```bash
   # On macOS with Homebrew
   brew install mongodb-community
   brew services start mongodb-community
   
   # On Ubuntu
   sudo systemctl start mongod
   
   # On Windows
   # Start MongoDB service from Services or run mongod.exe
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string

### 3. Environment Configuration

Create a `.env` file in the `server/` directory:

```bash
cd server
cp .env.example .env
```

Edit the `.env` file with your MongoDB connection:

```env
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/todoapp

# For MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp

PORT=5000
NODE_ENV=development
```

### 4. Initialize Database (Optional)

Add sample data to your database:

```bash
cd server
node database/setup.js
```

### 5. Run the Application

You need to run both the frontend and backend:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
# From the root directory
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |

### Example API Usage

```javascript
// Get all todos
GET /api/todos

// Create a todo
POST /api/todos
{
  "title": "Learn React"
}

// Update a todo
PUT /api/todos/507f1f77bcf86cd799439011
{
  "title": "Learn React and TypeScript",
  "completed": true
}

// Delete a todo
DELETE /api/todos/507f1f77bcf86cd799439011
```

## 🏗️ Database Schema

MongoDB collection: `todos`

```javascript
{
  _id: ObjectId,
  title: String (required),
  completed: Boolean (default: false),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Aesthetic**: Clean, professional design
- **Smooth Animations**: Hover effects and transitions
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Statistics Dashboard**: Track your productivity

## 🔧 Development

### Frontend Development
- Built with Vite for fast HMR
- TypeScript for type safety
- Tailwind CSS for rapid styling
- ESLint for code quality

### Backend Development
- Express.js with ES modules
- MongoDB with Mongoose ODM
- Structured routing and controllers
- Environment-based configuration

## 📦 Build & Deploy

### Frontend Build
```bash
npm run build
```

### Backend Production
```bash
cd server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check your MongoDB service is running
   - Verify connection string in `.env`
   - For Atlas: Check network access and database user permissions

2. **Frontend API Errors**
   - Make sure the backend server is running on port 5000
   - Check CORS configuration
   - Verify API endpoints

3. **Port Conflicts**
   - Frontend runs on port 5173 (Vite default)
   - Backend runs on port 5000
   - Change ports in respective config files if needed

4. **MongoDB Issues**
   - Ensure MongoDB is installed and running
   - Check database permissions
   - Verify connection string format

## 🌟 Features to Add

- [ ] User authentication
- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Task priorities
- [ ] Search functionality
- [ ] Drag and drop reordering
- [ ] Dark mode toggle
- [ ] Export/import todos

---

Built with ❤️ using React, Node.js, and MongoDB