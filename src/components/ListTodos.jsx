import React from "react";
import { Col, ListGroup, ListGroupItem, Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, todoSelectors } from "../slices/todosSlice";

const ListTodos = () => {
  const allTodos = useSelector(todoSelectors.selectAll);
  const onClickDelete = (id) => {
    dispatch(deleteTodo(id));
  };
  const dispatch = useDispatch();
  const todos = allTodos.map((todoItem) => (
    <ListGroupItem key={todoItem.id}>
      <Row>
        <Col>{todoItem.todo}</Col>
        <Col>
          <Button variant="danger" onClick={() => onClickDelete(todoItem.id)}>
            delete todo
          </Button>
        </Col>
      </Row>
    </ListGroupItem>
  ));
  return <ListGroup variant="flush">{todos}</ListGroup>;
};

export default ListTodos;
