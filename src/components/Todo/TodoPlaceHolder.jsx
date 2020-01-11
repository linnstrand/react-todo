import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import { setBullet } from './todoService';

class TodoPlaceHolder extends Component {
  constructor(props) {
    super(props);
    // Ref is useful for managing focus
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    // puts focus on the ref. Current is the DOM element it's used on
    this.inputRef.current.focus();
  }

  handleChange = event => {
    let todo = { ...this.props.todo };
    todo.content = event.target.value;
    this.props.onChange(todo);
  };

  toggleBullets = () => {
    let todo = setBullet(this.props.todo);
    this.props.onChange(todo);
  };

  render() {
    return (
      <div className='d-flex card todo-card todo-placeholder'>
        <div className='new-todo-body'>
          <div className='new-todo-text'>
            {!this.props.todo.content && (
              <div className='position-absolute new-todo-text todo-placeholder-title'>
                Write a note!
              </div>
            )}
            <ContentEditable
              html={this.props.todo.content || ''}
              innerRef={this.inputRef}
              className={'new-todo-text new-todo-content'}
              onChange={event => this.handleChange(event)}
            />
          </div>
        </div>
        <div className='new-todo-menu'>
          <button
            type='button'
            aria-label='Bullet Points'
            onClick={this.toggleBullets}
            className={'todo-card-action'}>
            <i className='mdi mdi-format-list-bulleted' />
          </button>
        </div>
      </div>
    );
  }
}

export default TodoPlaceHolder;
