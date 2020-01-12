import React, { Component } from 'react';
import TodoPlaceHolder from './TodoPlaceHolder';
import TodoCard from './TodoCard';
import { connect } from 'react-redux';
import { addTodo, updateNewTodo } from '../../store/reducers/todos';

const mapStateToProps = state => ({
  newTodo: state.todos.newTodo
});

const mapDispatchToProps = dispatch => {
  return {
    addTodo: todo => dispatch(addTodo(todo)),
    updateNewTodo: todo => dispatch(updateNewTodo(todo))
  };
};

const withTodoPlaceholder = WrappedComponent => props => {
  return !props.todo.content ? (
    <TodoPlaceHolder {...props} />
  ) : (
    <WrappedComponent {...props} />
  );
};

const ElementType = withTodoPlaceholder(TodoCard);

class NewTodo extends Component {
  render() {
    return (
      <ElementType
        todo={this.props.newTodo}
        onChange={todo => this.props.updateNewTodo(todo)}
        done={todo => this.props.addTodo(todo)}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTodo);
