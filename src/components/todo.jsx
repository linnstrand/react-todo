import React from 'react';
import './todo.scss';

const CardTodo = ({ todo }) => {
    return (
        <div className="todo-card card m-2">
            <div className="select-button" role="button">&#965;</div>
            <div className="card-body">
                <h5 className="card-title">
                    {todo.name}
                </h5>
                {todo.content && !Array.isArray(todo.content) && <div role="textbox" contentEditable="true" className="card-text">{todo.content}</div>}
                {todo.content && Array.isArray(todo.content) && todo.content.length > 0 && <div className="card-text">
                    <ul className="pl-3">
                        {todo.content.map((todo) => <li key={todo}>{todo}</li>)}
                    </ul>
                </div>}
            </div>
            <div className="card-footer">
                <button className="btn todo-card-action">Edit</button>
                <button className="btn todo-card-action">Delete</button>
                <button className="btn todo-card-action">Archive</button>
            </div>
        </div>
    );
}

export default CardTodo;