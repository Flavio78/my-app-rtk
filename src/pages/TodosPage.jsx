import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ListTodos from "../components/ListTodos";
import { addTodo, fetchTodos } from "../slices/todosSlice";
import { Button, InputGroup, FormControl, Container } from "react-bootstrap";

const TodosPage = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const onChangeInput = (e) => {
    setText(e.target.value);
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
  return (
    <Container fluid>
      <h1>Todos</h1>
      <div>
        <InputGroup>
          <FormControl
            placeholder="add an action to do"
            aria-label="add an action to do"
            aria-describedby="basic-addon2"
            value={text}
            onChange={onChangeInput}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={submit}>
              Add todo
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
      <ListTodos></ListTodos>
    </Container>
  );
};

export default TodosPage;
