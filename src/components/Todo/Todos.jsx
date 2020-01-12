import React, { Component } from 'react';
import TodoCard from './TodoCard';
import { connect } from 'react-redux';
import NewTodo from './NewTodo';

const mapStateToProps = state => ({
  todos: state.todos.list
});

class Todos extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='d-flex new-todo-card'>
          <NewTodo />
        </div>
        {this.props.todos.map(todo => (
          <div
            key={todo.id}
            className={'d-inline-flex align-items-start flex-wrap'}>
            <TodoCard todo={todo} />
          </div>
        ))}
      </React.Fragment>
    );
  }
}
export default connect(mapStateToProps)(Todos);
