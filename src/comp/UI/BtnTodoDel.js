import React from 'react';

const BtnTodoDel = (props) => {
  const clickHandler = () => {
    props.onClick();
  }
  return (
    <div>
      <button onClick={clickHandler}>❌</button>
    </div>
  );
};

export default BtnTodoDel;
