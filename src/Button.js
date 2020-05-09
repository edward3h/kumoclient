import React from "react";

const Button = ({ label, onClick, selected, partial }) => {
  const classNames = ["button"];
  if (selected) {
    classNames.push("selected");
  }
  if (partial) {
    classNames.push("partial");
  }
  return (
    <div className={classNames.join(" ")} onClick={onClick}>
      {label}
    </div>
  );
};

export default Button;
