import React, {useEffect, useState} from 'react';
import styles from './Todo.module.css';
import BtnTodoComplete from '../UI/BtnTodoComplete';
import BtnTodoDel from '../UI/BtnTodoDel';


const Todo = ({todo, doubleClick, addStatus, complete,startEditing,editTodo}) => {
  const style = todo.completed ? styles.todo + ' ' + styles.completed
    : styles.todo + ' ' + 'animate__animated animate__bounceIn';

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isEditing) {
      startEditing();
    }
  }, [isEditing, startEditing]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      editTodo(todo.id, e.target.value);
      setIsEditing(false);
    }
  };

  if (!addStatus) {
    return (
      <>
        <div className={style} onDoubleClick={() => setIsEditing(true)}>
          {isEditing ? (
            <input
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
