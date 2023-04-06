import React from 'react';
import {v4 as uuidv4} from 'uuid';

import './App.css';
import TodoForm from './comp/Todos/TodoForm'
import Todolist from './comp/Todos/Todolist';
import 'animate.css'
import TodosActions from './comp/Todos/TodosActions';


function App() {

  const [todos, setTodos] = React.useState ([]);
  const [isAdd, setIsAdd] = React.useState (false);
  const [isCompleted, setIsCompleted] = React.useState (false);


  const addTodoHandler = (text) => {
    const newTodo = {
      text: text,
      isCompleted: false,
      id: uuidv4 ()
    }
    const newTodos = [...todos, newTodo];
    setTodos (newTodos);
  }


  const doubleClickHandler = (id) => {
    const updateTodos = todos.filter ((todo) => todo.id !== id);
    setTodos (updateTodos);
    setIsAdd (!isAdd)
  }

  const completeHandler = (id) => {
    const updateTodos = todos.map ((todo) => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo);
    setTodos (updateTodos);
    setIsCompleted (!isCompleted)
  }

  const deleteHandler = () => {
    const updateTodos = todos.filter ((todo) => !todo.isCompleted);
    setTodos (updateTodos);
  };

  const resetTodosHandler = () => {
   setTodos([])
  }


  return (
    <div className="App">
      <h1 className='animate__animated animate__flipInY animate__delay-1s'>TODO APP</h1>
      <TodoForm addTodo={addTodoHandler}/>
<TodosActions deleteHandler={deleteHandler} resetTodo={resetTodosHandler}/>
      {!todos.length && <p>todo is empty</p>}
      <Todolist
        todos={todos}
        doubleClick={doubleClickHandler}
        addStatus={isAdd}
        complete={completeHandler}/>
    </div>

  );
}

export default App;
