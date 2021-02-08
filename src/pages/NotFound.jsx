import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div style={{ textAlign: "center" }}>
    <h1>Page not found</h1>
    <p>
      <Link to="/">Go To Home</Link>
    </p>
  </div>
);

export default NotFoundPage;
