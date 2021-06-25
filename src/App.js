import DiaryHome from './views/DiaryHome/DiaryHome';
import React from 'react';
import Home from './views/SignIn/Home';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
        <Route exact path="/home">
            <DiaryHome/>
        </Route>
        <Route exact path="/login">
            <Home/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
