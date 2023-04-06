import React from 'react';
import Delete from '../UI/Delete';
import Reset from '../UI/Reset';
import styles from './TodosActions.module.css';

const TodosActions = ({deleteHandler,resetTodo}) => {
  return (
    <div className={styles.actions}>
    <Reset resetTodo={resetTodo}/>
      <Delete deletTodo={deleteHandler}/>
    </div>
  );
};

export default TodosActions;
