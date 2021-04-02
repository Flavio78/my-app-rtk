import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ListTodos from "../components/ListTodos";
import { addTodo, fetchTodos } from "../slices/todosSlice";
import { Button, makeStyles, TextField } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const TodosPage = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("New todo");
  const onChangeInput = (e) => {
    setText(e.target.value);
  };
  const onClickLoad = () => {
    dispatch(fetchTodos());
  };
  useEffect(() => {
    dispatch(fetchTodos());
    return () => {
      // cleanup
    };
  }, [dispatch]);

  const submit = () => {
    dispatch(addTodo(text));
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Todos</h1>
      <Button variant="contained" color="primary" onClick={onClickLoad}>
        Load all Todos
      </Button>
      <TextField
        required
        defaultValue="New todo"
        value={text}
        onChange={onChangeInput}
      />
      <Button variant="contained" color="default" onClick={submit}>
        Add new todo
      </Button>
      <ListTodos />
    </div>
  );
};

export default TodosPage;
