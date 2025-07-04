import Todo from '../models/Todo.js';

export const todoController = {
  // Get all todos
  getAllTodos: async (req, res) => {
    try {
      const todos = await Todo.find().sort({ createdAt: -1 });
      
      // Transform the data to match frontend expectations
      const transformedTodos = todos.map(todo => ({
        id: todo._id,
        title: todo.title,
        completed: todo.completed,
        created_at: todo.createdAt
      }));
      
      res.json(transformedTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  },

  // Create a new todo
  createTodo: async (req, res) => {
    try {
      const { title } = req.body;
      
      if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
      }

      const todo = new Todo({
        title: title.trim()
      });

      const savedTodo = await todo.save();
      
      // Transform the response to match frontend expectations
      const transformedTodo = {
        id: savedTodo._id,
        title: savedTodo.title,
        completed: savedTodo.completed,
        created_at: savedTodo.createdAt
      };
      
      res.status(201).json(transformedTodo);
    } catch (error) {
      console.error('Error creating todo:', error);
      res.status(500).json({ error: 'Failed to create todo' });
    }
  },

  // Update a todo
  updateTodo: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, completed } = req.body;

      const updateData = {};
      
      if (title !== undefined) {
        updateData.title = title.trim();
      }
      
      if (completed !== undefined) {
        updateData.completed = completed;
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: 'No valid fields to update' });
      }

      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      // Transform the response to match frontend expectations
      const transformedTodo = {
        id: updatedTodo._id,
        title: updatedTodo.title,
        completed: updatedTodo.completed,
        created_at: updatedTodo.createdAt
      };

      res.json(transformedTodo);
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ error: 'Failed to update todo' });
    }
  },

  // Delete a todo
  deleteTodo: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedTodo = await Todo.findByIdAndDelete(id);

      if (!deletedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  }
};