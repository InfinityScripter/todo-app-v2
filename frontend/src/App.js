import React, {useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import './App.css';
import TodoForm from './comp/Todos/TodoForm'
import Todolist from './comp/Todos/Todolist';
import 'animate.css'
import TodosActions from './comp/Todos/TodosActions';


function App() {

  const [todos, setTodos] = React.useState ([]);
  const [isAdd, setIsAdd] = React.useState (false);
  const [isCompleted, setIsCompleted] = React.useState (false);
  const [editingTodo, setEditingTodo] = React.useState(null);

  const startEditing = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditingTodo(todoToEdit);
  }

  const editTodoHandler = async (id, newText) => {
    try {
      const updatedTodo = {...editingTodo, title: newText};
      const response = await axios.put(`/api/todos/${id}`, updatedTodo);
      const updatedTodos = todos.map((todo) => todo.id === id ? response.data : todo);
      setTodos(updatedTodos);
      setEditingTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addTodoHandler = async (text) => {
    try {
      const newTodo = {
        title: text,
        completed: false,
        id: uuidv4 ()
      }
      const response = await axios.post('/api/todos', newTodo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  const doubleClickHandler = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      const updateTodos = todos.filter ((todo) => todo.id !== id);
      setTodos (updateTodos);
      setIsAdd (!isAdd)
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  const completeHandler = async (id) => {
    try {
      const todoToComplete = todos.find((todo) => todo.id === id);
      const updatedTodo = {...todoToComplete, completed: !todoToComplete.completed};
      const response = await axios.put(`/api/todos/${id}`, updatedTodo);
      const updateTodos = todos.map ((todo) => todo.id === id ? response.data : todo);
      setTodos (updateTodos);
      setIsCompleted (!isCompleted)
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  }

  const deleteHandler = async () => {
    try {
      const completedTodos = todos.filter(todo => todo.completed);
      for (const todo of completedTodos) {
        await axios.delete(`/api/todos/${todo.id}`);
      }
      setTodos(todos.filter(todo => !todo.completed));
    } catch (error) {
      console.error('Error deleting completed todos:', error);
    }
  };

  const resetTodosHandler = async () => {
    try {
      await axios.delete('/api/todos');
      setTodos([]);
    } catch (error) {
      console.error('Error resetting todos:', error);
    }
  }

  const countCompleted = todos.filter ((todo) => todo.completed).length;

  return (
    <div className="App">
      <h1 className='animate__animated animate__flipInY animate__delay-1s animate__slow'>SIMPLE TODO</h1>
      <TodoForm addTodo={addTodoHandler}/>
      {todos.length > 0 && <TodosActions deleteHandler={deleteHandler} resetTodo={resetTodosHandler}/>}
      {!todos.length && <p>todo is empty</p>}
      <Todolist
        todos={todos}
        doubleClick={doubleClickHandler}
        addStatus={isAdd}
        complete={completeHandler}
        startEditing={startEditing}
        editTodo={editTodoHandler}
      />
      {countCompleted > 0 && <p className='animate__animated animate__bounceInUp animate__delay-1s animate__fast'>You
        have completed {countCompleted} todos</p>}
    </div>
  );
}

export default App;
