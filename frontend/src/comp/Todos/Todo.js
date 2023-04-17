import React from 'react';
import styles from './Todo.module.css';
import BtnTodoComplete from '../UI/BtnTodoComplete';
import BtnTodoDel from '../UI/BtnTodoDel';


const Todo = ({todo, doubleClick, addStatus, complete}) => {
  const style = todo.isCompleted ? styles.todo + ' ' + styles.completed : styles.todo + ' ' + 'animate__animated animate__bounceIn';


  if (!addStatus) {
    return (
      <>
        <div className={style}>
          <div className={styles.todoText}>📄 {todo.title} </div>
          <BtnTodoComplete onClick={complete}/>
          <BtnTodoDel onClick={doubleClick}/>
        </div>
      </>

    );
  }
};

export default Todo;
