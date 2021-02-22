import React from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { Header as Navbar } from "../components/Navbar";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFound";
import PostsPage from "../pages/PostsPage";
import SinglePostPage from "../pages/SinglePostPage";
import TodosPage from "../pages/TodosPage";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={DashboardPage} />
        <Route exact path="/posts" component={PostsPage} />
        <Route exact path="/posts/:id" component={SinglePostPage} />
        <Route exact path="/todos" component={TodosPage} />
        <Route exact path="/notfound" component={NotFoundPage} />
        <Redirect to="/notfound" />
      </Switch>
    </Router>
  );
};

export default App;
