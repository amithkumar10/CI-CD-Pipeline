import mongoose from 'mongoose';
import Todo from '../models/Todo.js';
import connectDB from '../config/database.js';

async function setupDatabase() {
  try {
    console.log('🔧 Setting up MongoDB database...');
    
    // Connect to MongoDB
    await connectDB();
    
    // Clear existing data (optional)
    await Todo.deleteMany({});
    console.log('🧹 Cleared existing todos');
    
    // Add sample data
    const sampleTodos = [
      { title: 'Learn React and TypeScript', completed: false },
      { title: 'Build a full-stack application', completed: false },
      { title: 'Set up MongoDB database', completed: true },
      { title: 'Deploy to production', completed: false }
    ];
    
    console.log('🌱 Adding sample data...');
    await Todo.insertMany(sampleTodos);
    
    console.log('✅ Database setup complete!');
    console.log('📋 Sample todos added to MongoDB');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();