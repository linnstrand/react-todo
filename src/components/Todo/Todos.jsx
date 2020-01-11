import React, { Component } from 'react';
import { addTodo, updateTodo, deleteTodo } from '../../store/reducers/todos';
import TodoPlaceHolder from './TodoPlaceHolder';
import TodoCard from './TodoCard';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => {
  return {
    addTodo: todo => dispatch(addTodo(todo)),
    updateTodo: todo => dispatch(updateTodo(todo)),
    deleteTodo: id => dispatch(deleteTodo(id))
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
    this.setState({ newTodo: { ...emptyTodo } });
  };

  doneEdit() {}

  render() {
    return (
      <React.Fragment>
        <div className='d-flex new-todo-card'>
          <NewTodo
            newTodo={this.state.newTodo}
            checked={this.state.checked.includes(this.state.newTodo.id)}
            onChange={todo => this.setState({ newTodo: todo })}
            check={id => this.toggleCheck(id)}
            done={() => this.addTodo()}
            deleteTodo={() => this.setState({ newTodo: { ...emptyTodo } })}
          />
        </div>
        {this.props.todos.map(todo => (
          <div
            key={todo.id}
            className={'d-inline-flex align-items-start flex-wrap'}>
            <TodoCard
              todo={todo}
              checked={this.state.checked.includes(todo.id)}
              setColor={color => this.props.setColor(color)}
              onChange={t => this.props.updateTodo(t)}
              toggleCheck={() => this.toggleCheck(todo.id)}
              deleteTodo={() => this.props.deleteTodo(todo.id)}
              done={() => this.doneEdit()}
            />
          </div>
        ))}
      </React.Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
