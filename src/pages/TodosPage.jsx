import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ListTodos from "../components/ListTodos";
import { addTodo } from "../slices/todosSlice";

const TodosPage = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const onChangeInput = (e) => {
    setText(e.target.value);
  };
  const submit = () => {
    dispatch(addTodo({ id: nanoid(), todo: text, completed: false }));
  };
  return (
    <section>
      <h1>Todos</h1>
      <input type="text" value={text} onChange={onChangeInput}></input>
      <button onClick={submit}>Add Todo</button>
      <ListTodos></ListTodos>
    </section>
  );
};

export default TodosPage;
