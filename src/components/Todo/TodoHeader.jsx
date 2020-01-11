import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';

export default class TodoHeader extends Component {
  render() {
    return (
      <React.Fragment>
        {!this.props.name && (
          <div className='position-absolute new-todo-text todo-placeholder'>
            Title
          </div>
        )}
        <ContentEditable
          html={this.props.name || ''}
          className={'card-title h5'}
          onChange={event => this.props.nameChange(event.target.value)}
        />
      </React.Fragment>
    );
  }
}
