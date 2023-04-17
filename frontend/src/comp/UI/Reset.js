import React from 'react';
import styles from './Reset.module.css';

const Reset = ({ resetTodo }) => {
  return (
    <div>
      <button className={styles.btnRes} onClick={resetTodo}>
        <span className={styles.spanDel}>Reset all tasks</span>
        <svg className={styles.svgRes}
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default Reset;
