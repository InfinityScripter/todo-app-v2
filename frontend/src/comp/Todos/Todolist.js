import React from 'react';
import Todo from './Todo';
import styles from './Todolist.module.css';

const Todolist = ({todos,doubleClick,complete, startEditing, editTodo}) => {

  return (
    <div className={styles.todoListContainer}>
      {todos.map ((todo) => (
        <Todo key={todo.id}
              todo={todo}
              doubleClick={()=>doubleClick(todo.id)}
              complete={()=>complete(todo.id)}
              startEditing={()=>startEditing(todo.id)}
              editTodo={editTodo}
        />
      ))}
    </div>
  );
};

export default Todolist;
