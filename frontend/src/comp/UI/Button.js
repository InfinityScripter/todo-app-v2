import React from 'react';

const Button = (props) => {
  const clickHandler = () => {
    props.onClick();
  }
  return (
    <>
      <button onChange={clickHandler}>{props.name}</button>
    </>
  );
};

export default Button;
