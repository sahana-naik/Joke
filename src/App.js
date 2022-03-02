import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoryList from "./component/UI/CategoryList";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<CategoryList />} />
        </Routes>
      </Router>
      {/* <CategoryList /> */}
    </React.Fragment>
  );
}

export default App;
