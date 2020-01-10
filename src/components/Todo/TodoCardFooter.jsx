import React, { Component } from 'react';
import { ColorOptions } from '../ColorOptions';

export default class TodoCardFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleColor: false
    };
  }

  setColor = color => {
    this.props.setColor(color);
    this.setState({ visibleColor: false });
  };

  render() {
    return (
      <React.Fragment>
        <div className='card-footer'>
          <div className='d-inline-flex'>
            <button
              type='button'
              className='todo-card-action'
              onClick={() =>
                this.setState({ visibleColor: !this.state.visibleColor })
              }>
              <i className='mdi mdi-brush' />
            </button>
            <button
              type='button'
              aria-label='Bullet Points'
              onClick={this.props.toggleBullets}
              className={
                'todo-card-action' +
                (this.props.hasBullets ? ' bullets-active' : '')
              }>
              <i className='mdi mdi-format-list-bulleted' />
            </button>
            <button
              type='button'
              aria-label='Delete'
              onClick={() => this.props.deleteTodo()}
              className='btn todo-card-action'>
              <i className='mdi mdi-delete' />
            </button>
            {this.props.isChanged && (
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
          setColor={color => this.setColor(color)}
        />
      </React.Fragment>
    );
  }
}
