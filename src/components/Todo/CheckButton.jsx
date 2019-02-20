import React from 'react';
export const CheckButton = props => (
	<div className={'select-button'} role='button' aria-label='Check Todo' onClick={() => props.editingToggle(props.id)}>
		<i className='mdi mdi-check' />
	</div>
);
