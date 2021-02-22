import React from "react";
import { Col, FormCheck, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { todoSelectors } from "../slices/todosSlice";

const ListTodos = () => {
  const allTodos = useSelector(todoSelectors.selectAll);
  const todos = allTodos.map((todoItem) => (
    <ListGroupItem key={todoItem.id}>
      <Row>
        <Col>{todoItem.todo}</Col>
        <Col>
          <FormCheck type="checkbox" label="completed"></FormCheck>
        </Col>
      </Row>
    </ListGroupItem>
  ));
  return <ListGroup variant="flush">{todos}</ListGroup>;
};

export default ListTodos;
