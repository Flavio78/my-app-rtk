import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import { todoSelectors } from "../slices/todosSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.grey,
  },
}));

const ListTodos = () => {
  const classes = useStyles();
  const allTodos = useSelector(todoSelectors.selectAll);
  const todos = allTodos.map((todoItem) => (
    <ListItem key={todoItem.id}>
      <ListItemText primary={todoItem.todo} />
      <ListItemIcon>
        <Checkbox checked={todoItem.completed} />
      </ListItemIcon>
    </ListItem>
  ));
  return (
    <List dense className={classes.root}>
      {todos}
    </List>
  );
};

export default ListTodos;
