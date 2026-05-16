import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { tasksAPI } from '../services/tasks';
import toast from 'react-hot-toast';

const TaskContext = createContext();

const initialState = {
  tasks: [], // Ensure this is always an array
  statusFilter: 'all',
  priorityFilter: 'all',
  searchQuery: '',
  loading: false,
  error: null,
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
      };
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'SET_FILTERS':
      return {
        ...state,
        statusFilter: action.payload.statusFilter ?? state.statusFilter,
        priorityFilter: action.payload.priorityFilter ?? state.priorityFilter,
        searchQuery: action.payload.searchQuery ?? state.searchQuery,
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const loadTasks = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await tasksAPI.getAll();
      // Handle different response structures
      let tasksArray = [];
      if (response.data && Array.isArray(response.data.tasks)) {
        tasksArray = response.data.tasks;
      } else if (response.data && Array.isArray(response.data)) {
        tasksArray = response.data;
      } else if (Array.isArray(response)) {
        tasksArray = response;
      } else if (response.tasks && Array.isArray(response.tasks)) {
        tasksArray = response.tasks;
      }

      dispatch({ type: 'SET_TASKS', payload: tasksArray });
    } catch (error) {
      console.error('Load tasks error:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.message || 'Failed to load tasks',
      });
      toast.error('Failed to load tasks');
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await tasksAPI.create(taskData);
      const newTask = response.data?.task || response.task || response;
      dispatch({ type: 'ADD_TASK', payload: newTask });
      toast.success('Task created successfully');
      return true;
    } catch (error) {
      console.error('Create task error:', error);
      toast.error(error.response?.data?.message || 'Failed to create task');
      return false;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await tasksAPI.update(id, taskData);
      const updatedTask = response.data?.task || response.task || response;
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
      toast.success('Task updated successfully');
      return true;
    } catch (error) {
      console.error('Update task error:', error);
      toast.error(error.response?.data?.message || 'Failed to update task');
      return false;
    }
  };

  const deleteTask = async (id) => {
    try {
      await tasksAPI.delete(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
      toast.success('Task deleted successfully');
      return true;
    } catch (error) {
      console.error('Delete task error:', error);
      toast.error(error.response?.data?.message || 'Failed to delete task');
      return false;
    }
  };

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Ensure state.tasks is always an array before filtering
  const tasksArray = Array.isArray(state.tasks) ? state.tasks : [];

  const filteredTasks = tasksArray.filter((task) => {
    // Status filter
    if (state.statusFilter !== 'all' && task.status !== state.statusFilter) {
      return false;
    }

    // Priority filter
    if (
      state.priorityFilter !== 'all' &&
      task.priority !== state.priorityFilter
    ) {
      return false;
    }

    // Search query
    if (
      state.searchQuery &&
      !task.title?.toLowerCase().includes(state.searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const taskCounts = {
    all: tasksArray.length,
    pending: tasksArray.filter((t) => t.status === 'pending').length,
    'in-progress': tasksArray.filter((t) => t.status === 'in-progress').length,
    completed: tasksArray.filter((t) => t.status === 'completed').length,
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        allTasks: tasksArray,
        loading: state.loading,
        error: state.error,
        filters: {
          status: state.statusFilter,
          priority: state.priorityFilter,
          search: state.searchQuery,
        },
        taskCounts,
        createTask,
        updateTask,
        deleteTask,
        setFilters,
        loadTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
}
