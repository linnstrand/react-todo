import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';

export default class TodoHeader extends Component {
  render() {
    return (
      <React.Fragment>
        {!this.props.name && (
          <div className='position-absolute new-todo-text todo-placeholder-title'>
            No title set
          </div>
        )}
        <ContentEditable
          html={this.props.name || ''}
          className={'card-title h5'}
          onChange={event => this.props.onChange(event.target.value)}
          onFocus={() => this.props.setActive(true)}
          onBlur={() => this.props.setActive(false)}
        />
      </React.Fragment>
    );
  }
}
