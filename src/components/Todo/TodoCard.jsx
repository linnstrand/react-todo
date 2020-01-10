import React, { Component } from 'react';
import '../../styles/todo.scss';
import { setBullet } from './todoService';
import TodoCardFooter from './TodoCardFooter';
import { CheckButton } from '../CheckButton';
import TodoHeader from './TodoHeader';
import TodoBody from './TodoBody';

export default class TodoCard extends Component {
  constructor(props) {
    super(props);
    this.cardRef = React.createRef();
    this.inputRef = React.createRef();

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      originalTodo: { ...this.props.todo }
    };
  }

  // Initition
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    const ref = this.inputRef.current;
    if (this.props.todo.id === 0 && ref) {
      const range = document.createRange();
      var sel = window.getSelection();
      range.setStart(ref, 1);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      ref.focus();
    }
  }

  // Destruction
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  // Events
  handleClickOutside = e => {
    // If this todo is active, and the card doesn't contain the cliched element, accept changes.
    if (this.props.isActive && !this.cardRef.current.contains(e.target)) {
      this.close();
    }
  };

  handleChange = (event, field) => {
    let changed = { ...this.props.todo };
    changed[field] = event.target.value;
    this.onChange(changed);
  };

  undo = () => {
    this.onChange(this.state.originalTodo);
    this.close();
  };

  toggleBullets = () => {
    let todo = setBullet(this.props.todo);
    this.onChange(todo);
  };

  // !Events

  isChanged = () =>
    this.props.todo.name !== this.state.originalTodo.name ||
    this.props.todo.content !== this.state.originalTodo.content;

  close = () => {
    this.props.done(this.props.todo);
  };

  onChange(changed) {
    changed.hasBullets = changed.content.includes('<li>');
    this.props.onChange(changed);
  }

  render() {
    let todo = this.props.todo;
    return (
      <div
        ref={this.cardRef}
        className={`todo-card card' ${
          this.props.isActive ? ' is-editing' : ''
        }${this.props.checked ? ' is-checked' : ''}`}
        style={{ backgroundColor: todo.color || '#fff' }}
        >
        <CheckButton editingToggle={this.props.check} id={this.props.todo.id} />
        <TodoHeader
          name={todo.name}
          nameChange={name => this.handleChange(name, 'name')}
        />
        <TodoBody
          content={todo.content}
          contentChange={content => this.handleChange(content, 'content')}
        />
        <TodoCardFooter
          hasBullets={todo.hasBullets}
          isChanged={() => this.isChanged()}
          iActive={this.props.isActive}
          toggleBullets={() => this.toggleBullets()}
          deleteTodo={() => this.props.deleteTodo(todo.id)}
          setColor={color => this.onChange({...todo, color: color})}
        />
      </div>
    );
  }
}
