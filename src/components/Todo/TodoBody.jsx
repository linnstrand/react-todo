import React from 'react';
import ContentEditable from 'react-contenteditable';

export const TodoBody = props => (
  <div>
    <ContentEditable
      html={props.content}
      innerRef={props.targetRef}
      className={'card-text'}
      onChange={event => props.contentChange(event.target.value)}
    />
  </div>
);
