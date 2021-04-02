import { makeStyles } from "@material-ui/core";
import React from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import Drawer from "../pages/Drawer";
import NotFoundPage from "../pages/NotFound";
import PostsPage from "../pages/PostsPage";
import SinglePostPage from "../pages/SinglePostPage";
import TodosPage from "../pages/TodosPage";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Router>
        <Drawer></Drawer>
        <Switch>
          <Route
            exact
            path="/"
            component={(props) => <DashboardPage {...props} />}
          />
          <Route
            exact
            path="/posts"
            render={(props) => <PostsPage {...props} />}
          />
          <Route
            exact
            path="/posts/:id"
            render={(props) => <SinglePostPage {...props} />}
          />
          <Route
            exact
            path="/todos"
            render={(props) => <TodosPage {...props} />}
          />
          <Route
            exact
            path="/notfound"
            render={(props) => <NotFoundPage {...props} />}
          />
          <Redirect to="/notfound" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
