import React from 'react';
import './todo.scss';


const CardTodo = ({ todo }) => {
    let colorEditing = false;
    const editColor = () => {
        colorEditing = !colorEditing;
        console.log(colorEditing);
    };

    return (
        <React.Fragment>
            <div className="todo-card card m-2">
                <div className="select-button" role="button"><i className="mdi mdi-check"></i></div>
                <div className="card-body mb-2">
                    <div className="card-title mt-2 h5" contentEditable="true" aria-multiline="true">
                        {todo.name}
                    </div>
                    {todo.content && !Array.isArray(todo.content) &&
                        <div role="textbox" contentEditable="true" aria-multiline="true" className="card-text card-editable">{todo.content}</div>}
                    {todo.content && Array.isArray(todo.content) && todo.content.length > 0 && <div className="card-text">
                        <ul className="pl-3">
                            {todo.content.map((todo) => <li key={todo}>{todo}</li>)}
                        </ul>
                    </div>}
                </div>
                <div className="card-footer">
                    <button aria-label="Color" onClick={() => editColor()} className="btn todo-card-action"><i className="mdi mdi-brush"></i></button>
                    <button aria-label="Delete" className="btn todo-card-action"><i className="mdi mdi-delete"></i></button>
                    <button aria-label="Archive" className="btn todo-card-action"><i className="mdi mdi-archive"></i></button>
                </div>
            </div>
            {colorEditing && <div className="color-edit"></div>}
        </React.Fragment>
    );
}

export default CardTodo;