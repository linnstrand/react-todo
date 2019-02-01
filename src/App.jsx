import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'


const App = () => (
  <Router>
    <div className="App">
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/todos" className="nav-link">ToDos ()</Link>
        <Link to="/archive" className="nav-link">Archive</Link>
        <Link to="/about" className="nav-link">About</Link>
      </nav>
      <main className="mt-4">
        <div className="container-fluid">
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
        </div>
      </main>
    </div>
  </Router>
);


export default App;
