import React, { useState, useEffect } from 'react';
import { Plus, Filter, CheckCircle, Circle, Trash2, Edit3, X, Check } from 'lucide-react';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

type FilterType = 'all' | 'completed' | 'pending';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos`);
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos. Make sure the backend server is running.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new todo
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, {
        title: newTodo.trim()
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
      setError(null);
    } catch (err) {
      setError('Failed to add todo.');
      console.error('Error adding todo:', err);
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      const response = await axios.put(`${API_BASE_URL}/todos/${id}`, {
        completed: !todo.completed
      });
      setTodos(todos.map(t => t.id === id ? response.data : t));
      setError(null);
    } catch (err) {
      setError('Failed to update todo.');
      console.error('Error updating todo:', err);
    }
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`);
      setTodos(todos.filter(t => t.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete todo.');
      console.error('Error deleting todo:', err);
    }
  };

  // Start editing todo
  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.title);
  };

  // Save edited todo
  const saveEdit = async () => {
    if (!editingText.trim() || editingId === null) return;

    try {
      const response = await axios.put(`${API_BASE_URL}/todos/${editingId}`, {
        title: editingText.trim()
      });
      setTodos(todos.map(t => t.id === editingId ? response.data : t));
      setEditingId(null);
      setEditingText('');
      setError(null);
    } catch (err) {
      setError('Failed to update todo.');
      console.error('Error updating todo:', err);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  // Get stats
  const totalTodos = todos.length;
  const completedTodos = todos.filter(t => t.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            My Todo List
          </h1>
          <p className="text-gray-600">
            Organize your tasks and boost your productivity
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-2xl font-bold text-blue-600">{totalTodos}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-2xl font-bold text-green-600">{completedTodos}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-2xl font-bold text-orange-600">{pendingTodos}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>

        {/* Add Todo Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={addTodo} className="flex gap-3">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              Add Todo
            </button>
          </form>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'all' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50'
            }`}
          >
            <Filter size={16} />
            All ({totalTodos})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'pending' 
                ? 'bg-orange-500 text-white shadow-md' 
                : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50'
            }`}
          >
            <Circle size={16} />
            Pending ({pendingTodos})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'completed' 
                ? 'bg-green-500 text-white shadow-md' 
                : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50'
            }`}
          >
            <CheckCircle size={16} />
            Completed ({completedTodos})
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Circle size={48} className="mx-auto" />
              </div>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? 'No todos yet. Add one above!' 
                  : filter === 'completed' 
                    ? 'No completed todos yet.'
                    : 'No pending todos. Great job!'
                }
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`todo-item bg-white rounded-lg shadow-md p-4 flex items-center gap-3 ${
                  todo.completed ? 'opacity-75' : ''
                }`}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex-shrink-0 transition-colors ${
                    todo.completed 
                      ? 'text-green-500 hover:text-green-600' 
                      : 'text-gray-400 hover:text-green-500'
                  }`}
                >
                  {todo.completed ? (
                    <CheckCircle size={24} />
                  ) : (
                    <Circle size={24} />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                      autoFocus
                    />
                  ) : (
                    <p
                      className={`text-lg ${
                        todo.completed 
                          ? 'line-through text-gray-500' 
                          : 'text-gray-800'
                      }`}
                    >
                      {todo.title}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(todo.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {editingId === todo.id ? (
                    <>
                      <button
                        onClick={saveEdit}
                        className="p-2 text-green-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(todo)}
                        className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;