import React from 'react';

const BtnTodoComplete = (props) => {
  const clickHandler = () => {
    props.onClick();
  }
  return (
    <div>
      <button  onClick={clickHandler}>✅</button>
    </div>
  );
};

export default BtnTodoComplete;
