import React from 'react';
import TodoNew from '../components/Todo/TodoNew';
import CardTodo from '../components/Todo/Todo';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    todos: state.todos,
    editing: state.editing
});

const Todos = ({ todos, editing }) => {
    return (
        <React.Fragment>
            <TodoNew />
            <div className='d-inline-flex align-items-start flex-wrap'>
                {todos.map(item => (
                    <CardTodo key={item.id} todo={item} checked={editing.checked.includes(item.id)} className='shadow-sm card m-2' />
                ))}
            </div>
        </React.Fragment>
    );
};

export default connect(mapStateToProps)(Todos);
