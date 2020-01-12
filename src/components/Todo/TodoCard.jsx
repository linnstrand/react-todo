import React, { Component } from 'react';
import { addTodo, updateTodo, deleteTodo } from '../../store/reducers/todos';
import { connect } from 'react-redux';
import { setBullet } from './todoService';
import TodoCardFooter from './TodoCardFooter';
import TodoHeader from './TodoHeader';
import { TodoBody } from './TodoBody';

const mapStateToProps = state => ({
  todos: state.todos.list
});

const mapDispatchToProps = dispatch => {
  return {
    addTodo: todo => dispatch(addTodo(todo)),
    updateTodo: todo => dispatch(updateTodo(todo)),
    deleteTodo: id => dispatch(deleteTodo(id))
  };
};

class TodoCard extends Component {
  constructor(props) {
    super(props);
    this.cardRef = React.createRef();
    this.inputRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      originalTodo: { ...this.props.todo },
      titleActive: false,
      contentActive: false
    };
  }

  // Initition
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);

    const current = this.inputRef.current;
    if (this.isNew() && current) {
      const range = document.createRange();
      var sel = window.getSelection();
      range.setStart(current, 1);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      current.focus();
    }
  }

  isNew = () => this.props.todo.id === 0;

  // Destruction
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  // close todo if leaving focus
  handleClickOutside = e => {
    // If this todo is active, and the card doesn't contain the cliched element, accept changes.
    if (this.isActive() && !this.cardRef.current.contains(e.target)) {
      this.close();
    }
  };

  isActive = () => this.state.contentActive || this.state.titleActive;

  undo = () => {
    this.props.updateTodo(this.state.originalTodo);
    this.close();
  };

  toggleBullets = () => {
    let todo = setBullet(this.props.todo);
    this.onChange(todo);
  };

  onChange(changed) {
    changed.hasBullets = changed.content.includes('<li>');
    if (this.props.onChange) {
      this.props.onChange(changed);
    } else {
      this.props.updateTodo(changed);
    }
  }

  isChanged = () =>
    this.props.todo.name !== this.state.originalTodo.name ||
    this.props.todo.content !== this.state.originalTodo.content;

  close = () => {
    this.setState({ titleActive: false, contentActive: false });
  };

  render() {
    let todo = this.props.todo;
    return (
      <div
        ref={this.cardRef}
        className={`todo-card card${this.isActive() ? ' is-editing' : ''}${
          todo.hasBullets ? ' bullets-active' : ''
        }`}
        style={{ backgroundColor: todo.color || '#fff' }}>
        <TodoHeader
          name={todo.name}
          onChange={name => this.onChange({ ...todo, name: name })}
          setActive={state => this.setState({ titleActive: state })}
        />
        <TodoBody
          content={todo.content}
          targetRef={this.inputRef}
          onChange={content => this.onChange({ ...todo, content: content })}
          setActive={state => this.setState({ contentActive: state })}
        />
        <TodoCardFooter
          isChanged={this.isChanged() && !this.isNew()}
          toggleBullets={() => this.toggleBullets()}
          deleteTodo={() => this.props.deleteTodo(todo.id)}
          setColor={color => this.onChange({ ...todo, color: color })}
          undo={() => this.undo()}
          close={() => this.close()}
        />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoCard);
