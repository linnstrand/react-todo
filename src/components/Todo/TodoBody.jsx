import React from 'react';
import ContentEditable from 'react-contenteditable';

export const TodoBody = props => (
  <ContentEditable
    html={props.content}
    innerRef={props.targetRef}
    className={'card-text'}
    onChange={event => props.onChange(event.target.value)}
    onFocus={() => props.setActive(true)}
    onBlur={() => props.setActive(false)}
  />
);
