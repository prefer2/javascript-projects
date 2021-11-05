import React, { useState } from "react";
import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from ".././UI/Card";

const ExpenseItem = (data) => {
  const [title, setTitle] = useState(data.title); // first value: point at that managed value. second value: function which we can later call to set a new title
  const clickHandler = () => {
    setTitle("updated!");
  };
  return (
    <Card className="expense-item">
      <ExpenseDate date={data.date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">{data.amount}</div>
      </div>
      <button onClick={clickHandler}>Change Title</button>
    </Card>
  );
};

export default ExpenseItem;
