import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './bootstrap.min.css';

const Start = (props) => {
  return (
    <div className="container">
      <div className="card-columns">
        {props.todos.map((item) => <div className="card">
          <div class="card-body">
            <h5 class="card-title">
              {item.name}
            </h5>
            {item.content && !Array.isArray(item.content) && <div className="card-text">{item.content}</div>}
            {item.content && Array.isArray(item.content) && item.content.length > 0 && <div className="card-text">
              <ul>
                {item.content.map((todo) => <li>{todo}</li>)}
              </ul>
            </div>}
          </div>
        </div>)}
      </div>
    </div>
  );
}
const About = () => <div>About</div>;

const todos = [
  { name: 'Shopping', content: ['Chicken', 'Yogurt', 'Milk', 'Potatoes'] },
  { name: 'Book Hair Appointment', content: 'Soon!' }
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: todos
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/todos" className="nav-link">ToDos</Link>
            <Link to="/archive" className="nav-link">Archive</Link>
            <Link to="/about" className="nav-link">About</Link>
          </nav>
          <main>
            <Route path="/" exact render={(props) => <Start {...props} todos={this.state.todos} />} />
            <Route path="/about" exact component={About} />

          </main>
        </div>
      </Router>
    );
  }
}

export default App;
