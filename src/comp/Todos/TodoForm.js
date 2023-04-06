import React from 'react';
import Button from '../UI/Button';
import styles from './TodoForm.module.css';


const TodoForm = ({addTodo}) => {
  const [input, setInput] = React.useState ('');


  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (input.trim() === '') {
      const inputEl = e.target.querySelector('input');
      inputEl.classList.add('animate__animated', 'animate__shakeX');
      setTimeout(() => {
        inputEl.classList.remove('animate__animated', 'animate__shakeX');
      }, 1000); // remove the class after 1 second
      return;
    }
    addTodo (input.trim());
    setInput ('');
  }


  const inputHandler = (e) => {
    setInput (e.target.value);
  }


  return (
    <div className={styles.todoFormContainer}>
      <form onSubmit={onSubmitHandler}>
        <input placeholder='Add new todo' type="text" value={input} onChange={inputHandler} />
        <Button name="Add" onClick={onSubmitHandler}/>
      </form>
    </div>
  );
};

export default TodoForm;
