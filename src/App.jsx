import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

const App = () => (
  <Router>
    <div className='App'>
      <nav className='navbar navbar-expand navbar-light'>
        <div className='navbar-nav'>
          <Link to='/' className='nav-link'>
            Home
          </Link>
          <Link to='/todos' className='nav-link'>
            Todos
          </Link>
          <Link to='/archive' className='nav-link'>
            Archive
          </Link>
          <Link to='/about' className='nav-link'>
            About
          </Link>
        </div>
      </nav>
      <main className='mt-4'>
        <div className='container-fluid'>
          <Route path='/' exact component={Home} />
          <Route path='/about' exact component={About} />
        </div>
      </main>
    </div>
  </Router>
);

export default App;
