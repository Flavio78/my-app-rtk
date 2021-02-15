import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ListTodos from "../components/ListTodos";
import { addTodo } from "../slices/todosSlice";
import { Button, Input } from "@material-ui/core";

const TodosPage = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const onChangeInput = (e) => {
    setText(e.target.value);
  };
  const submit = () => {
    dispatch(addTodo(text));
  };
  return (
    <section>
      <h1>Todos</h1>
      <div>
        <Input type="text" value={text} onChange={onChangeInput}></Input>
        <Button variant="contained" color="primary" onClick={submit}>
          Add Todo
        </Button>
      </div>
      <ListTodos></ListTodos>
    </section>
  );
};

export default TodosPage;
