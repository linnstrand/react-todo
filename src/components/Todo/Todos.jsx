import React, { Component } from 'react';
import { addTodo, updateTodo } from '../../store/reducers/todos';
import TodoPlaceHolder from './TodoPlaceHolder';
import TodoCard from './TodoCard';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => {
  return {
    addTodo: todo => dispatch(addTodo(todo)),
    updateTodo: todo => dispatch(updateTodo(todo))
  };
};

const withTodoPlaceholder = WrappedComponent => ({ newTodo, ...others }) => {
  return !newTodo.content ? (
    <TodoPlaceHolder todo={newTodo} {...others} />
  ) : (
    <WrappedComponent todo={newTodo} {...others} />
  );
};

const NewTodo = withTodoPlaceholder(TodoCard);
const emptyTodo = { name: '', content: '', id: 0 };

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target: undefined,
      targetChanged: false,
      activeTodo: undefined,
      checked: [],
      newTodo: { ...emptyTodo }
    };
  }

  toggleCheck = id => {
    const checked = this.state.checked;
    const newArray = checked.includes(id)
      ? checked.filter(i => i !== id)
      : [...checked, id];
    this.setState({ checked: newArray });
  };

  addTodo = () => {
    this.props.addTodo(this.state.newTodo);
    this.setState({ target: undefined, newTodo: { ...emptyTodo } });
  };

  onEdit(todo) {
    this.setState({ target: todo.id });
    this.props.updateTodo(todo);
  }

  render() {
    return (
      <React.Fragment>
        <div
          className={
            'd-flex new-todo-card' +
            (this.state.activeTodo === 0 ? ' is-active' : '')
          }>
          <NewTodo
            newTodo={this.state.newTodo}
            checked={this.state.checked.includes(this.state.newTodo.id)}
            isActive={this.state.target === this.state.newTodo.id}
            setActive={() => this.setState({ target: this.state.newTodo.id })}
            onChange={todo => this.setState({ newTodo: todo })}
            check={id => this.toggleCheck(id)}
            done={() => this.addTodo()}
          />
        </div>
        {this.props.todos.map(todo => (
          <div
            key={todo.id}
            className={
              'd-inline-flex align-items-start flex-wrap' +
              (this.state.activeTodo === 0 ? ' is-active' : '')
            }>
            <TodoCard
              todo={todo}
              checked={this.state.checked.includes(todo.id)}
              isActive={this.state.target === todo.id}
              onChange={t => this.onEdit(t)}
              setActive={() => this.setState({ target: todo.id })}
              done={() => this.setState({ target: undefined })}
            />
          </div>
        ))}
      </React.Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
