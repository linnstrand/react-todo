import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';

export default class TodoBody extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  render() {
    return (
      <div>
        <ContentEditable
          html={this.props.content}
          innerRef={this.inputRef}
          className={'card-text'}
          onChange={event => this.props.contentChange(event, 'content')}
        />
      </div>
    );
  }
}
