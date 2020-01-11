import React, { Component } from 'react';
import '../../styles/todo.scss';
import { setBullet } from './todoService';
import TodoCardFooter from './TodoCardFooter';
import { CheckButton } from '../CheckButton';
import TodoHeader from './TodoHeader';
import { TodoBody } from './TodoBody';

export default class TodoCard extends Component {
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
    if (this.props.todo.id === 0 && current) {
      const range = document.createRange();
      var sel = window.getSelection();
      range.setStart(current, 1);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      current.focus();
    }
  }

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
    this.props.onChange(this.state.originalTodo);
    this.close();
  };

  toggleBullets = () => {
    let todo = setBullet(this.props.todo);
    this.onChange(todo);
  };

  onChange(changed) {
    changed.hasBullets = changed.content.includes('<li>');
    this.props.onChange(changed);
  }

  isChanged = () =>
    this.props.todo.name !== this.state.originalTodo.name ||
    this.props.todo.content !== this.state.originalTodo.content;

  close = () => {
    this.props.done(this.props.todo);
  };

  render() {
    let todo = this.props.todo;
    return (
      <div
        ref={this.cardRef}
        className={`todo-card card${this.isActive() ? ' is-editing' : ''}${
          this.props.checked ? ' is-checked' : ''
        }${todo.hasBullets ? ' bullets-active' : ''}`}
        style={{ backgroundColor: todo.color || '#fff' }}>
        {todo.id > 0 && (
          <CheckButton toggleCheck={() => this.props.toggleCheck()} />
        )}
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
          isChanged={this.isChanged()}
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
