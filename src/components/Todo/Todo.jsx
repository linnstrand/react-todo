import React, { Component } from 'react';
import TodoCardFooter from './TodoCardFooter';
import TodoHeader from './TodoHeader';
import TodoBody from './TodoBody';

class Todo extends Component {
  render() {
    return (
      <div
        ref={this.cardRef}
        className={`todo-card card' ${
          this.props.isActive ? ' is-editing' : ''
        }${this.props.checked ? ' is-checked' : ''}`}
        style={{ backgroundColor: todo.color || '#fff' }}
        onMouseLeave={() => this.setState({ visibleColor: false })}></div>
    );
  }
}

Todo.Body = TodoBody;
Todo.Header = TodoHeader;
Todo.Footer = TodoCardFooter;

export default Todo;
