import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, todoSelectors } from "../slices/todosSlice";
import {
  Button,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@material-ui/core";
import {
  AccessAlarm,
  ThreeDRotation,
  Delete,
  Assignment,
} from "@material-ui/icons";

const ListTodos = () => {
  const allTodos = useSelector(todoSelectors.selectAll);
  const onClickDelete = (id) => {
    dispatch(deleteTodo(id));
  };
  const dispatch = useDispatch();
  const todos = allTodos.map((todoItem) => (
    <ListItem key={todoItem.id}>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary={todoItem.todo} />
      <Button
        variant="contained"
        color="secondary"
        startIcon={<Delete />}
        onClick={() => onClickDelete(todoItem.id)}
      >
        delete
      </Button>
      <ListItemSecondaryAction>
        <Switch edge="end" checked="true" />
      </ListItemSecondaryAction>
    </ListItem>
  ));
  return <List variant="flush">{todos}</List>;
};

export default ListTodos;
