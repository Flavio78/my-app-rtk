import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { todoSelectors } from "../slices/todosSlice";

const ListTodos = () => {
  const allTodos = useSelector(todoSelectors.selectAll);
  const todos = allTodos.map((todoItem) => (
    <ListItem key={todoItem.id}>
      <ListItemText primary={todoItem.todo} />
      <ListItemIcon>
        <Checkbox edge="start" checked={todoItem.completed} />
      </ListItemIcon>
    </ListItem>
  ));
  return <List dense>{todos}</List>;
};

export default ListTodos;
