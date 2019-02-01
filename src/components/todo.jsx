import React from 'react';
import PropTypes from 'prop-types'
import './todo.scss';

const CardTodo = ({ todo, editColor }) => (
    <div className="todo-card card m-2">
        <div className="select-button" role="button"><i className="mdi mdi-check"></i></div>
        <div className="card-body mb-2">
            <div className="card-title mt-2 h5" contentEditable="true" aria-multiline="true" suppressContentEditableWarning="true">
                {todo.name}
            </div>
            {todo.content && !Array.isArray(todo.content) &&
                <div role="textbox" contentEditable="true" suppressContentEditableWarning="true" aria-multiline="true" className="card-text card-editable">{todo.content}</div>}
            {todo.content && Array.isArray(todo.content) && todo.content.length > 0 && <div className="card-text">
                <ul className="pl-3">
                    {todo.content.map((todo) => <li key={todo}>{todo}</li>)}
                </ul>
            </div>}
        </div>
        <div className="card-footer">
            <button aria-label="Color" onClick={() => editColor(todo.name)} className="btn todo-card-action"><i className="mdi mdi-brush"></i></button>
            <button aria-label="Delete" className="btn todo-card-action"><i className="mdi mdi-delete"></i></button>
            <button aria-label="Archive" className="btn todo-card-action"><i className="mdi mdi-archive"></i></button>
        </div>
    </div>
);


CardTodo.propTypes = {
    todo: PropTypes.object.isRequired,
    editColor: PropTypes.func.isRequired
}

export default CardTodo;