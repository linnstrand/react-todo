import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import './todo.scss';
import { setBullet } from './todoService';
import { ColorOptions } from '../ColorOptions';
import { CheckButton } from '../CheckButton';

export default class TodoCard extends Component {
  constructor(props) {
    super(props);
    this.cardRef = React.createRef();
    this.inputRef = React.createRef();

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      originalTodo: { ...this.props.todo },
      visibleColor: false
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
        onMouseLeave={() => this.setState({ visibleColor: false })}>
        <CheckButton editingToggle={this.props.check} id={this.props.todo.id} />
        <div className='card-body' onClick={() => this.props.setActive(todo)}>
          {!todo.name && (
            <div className='position-absolute new-todo-text todo-placeholder'>
              Title
            </div>
          )}
          <ContentEditable
            html={todo.name || ''}
            className={'card-title h5'}
            onChange={event => this.handleChange(event, 'name')}
          />
          <ContentEditable
            html={todo.content}
            innerRef={this.inputRef}
            className={'card-text'}
            onChange={event => this.handleChange(event, 'content')}
          />
        </div>
        <div className='card-footer'>
          <div className='d-inline-flex'>
            <button
              type='button'
              className='todo-card-action'
              onMouseEnter={() => this.setState({ visibleColor: true })}>
              <i className='mdi mdi-brush' />
            </button>
            <button
              type='button'
              aria-label='Bullet Points'
              onClick={this.toggleBullets}
              className={
                'todo-card-action' + (todo.hasBullets ? ' bullets-active' : '')
              }>
              <i className='mdi mdi-format-list-bulleted' />
            </button>
            <button
              type='button'
              aria-label='Delete'
              onClick={() => this.props.deleteTodo(todo.id)}
              className='btn todo-card-action'>
              <i className='mdi mdi-delete' />
            </button>
            {this.isChanged() && (
              <button
                type='button'
                aria-label='Undo'
                onClick={this.undo}
                className='todo-card-action'>
                <i className='mdi mdi-undo' />
              </button>
            )}
          </div>
          {this.props.isActive && (
            <button
              type='button'
              aria-label='Save'
              onClick={this.close}
              className='btn btn-light'>
              Close
            </button>
          )}
        </div>
        <ColorOptions
          visibleColor={this.state.visibleColor}
          setColor={this.props.setColor}
          id={todo.id}
        />
      </div>
    );
  }
}
