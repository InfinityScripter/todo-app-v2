import React, { useEffect, useState, useRef } from 'react';
import styles from './Todo.module.css';
import BtnTodoComplete from '../UI/BtnTodoComplete';
import BtnTodoDel from '../UI/BtnTodoDel';

const Todo = ({ todo, doubleClick, addStatus, complete, startEditing, editTodo }) => {
  const style = todo.completed
    ? styles.todo + ' ' + styles.completed
    : styles.todo + ' ' + 'animate__animated animate__bounceIn';

  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const todoContainerRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      startEditing();
      window.addEventListener('mousedown', handleClickOutside);
    } else {
      window.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, startEditing]);

  const handleClickOutside = (e) => {
    if (
      todoContainerRef.current &&
      !todoContainerRef.current.contains(e.target)
    ) {
      editTodo(todo.id, inputRef.current.value);
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      editTodo(todo.id, e.target.value);
      setIsEditing(false);
    }
  };

  if (!addStatus) {
    return (
      <>
        <div
          ref={todoContainerRef}
          className={style}
          onDoubleClick={() => setIsEditing(true)}
        >
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              defaultValue={todo.title}
              onKeyDown={handleKeyPress}
              className={styles.todoText}
            />

          ) : (
            <div className={styles.todoText}>📄 {todo.title}</div>
          )}
          <BtnTodoComplete onClick={complete} />
          <BtnTodoDel onClick={doubleClick} />
        </div>
      </>
    );
  }
};

export default Todo;
