import React from 'react'
import { editColor, cancelEdit, setColor, deleteTodo } from '../actions';
import CardTodo from '../components/todo';
import { connect } from 'react-redux';
import ColorEditer from '../components/colorEditer';

const mapStateToProps = state => ({
    todos: state.todos, editState: state.editState
});

const mapDispatchToProps = dispatch => {
    return {
        editColor: name => dispatch(editColor(name)),
        deleteTodo: name => dispatch(deleteTodo(name)),
        cancelEdit: () => dispatch(cancelEdit()),
        setColor: (name, hex) => dispatch(setColor({ name, hex })),
    }
}

const Home = ({ todos, editState, editColor, cancelEdit, deleteTodo, setColor }) => {
    const saveEdit = (name, hex) => {
        setColor(name, hex);
        cancelEdit();
    }

    return (<React.Fragment>
        <h3>{editState.name}</h3>
        <div className="d-inline-flex align-items-start">
            {todos.map((item) =>
                <CardTodo key={item.name} todo={item} editColor={editColor} deleteTodo={deleteTodo} className="shadow-sm card m-2" />)}
        </div>
        <div className="new-note">
            <form className="d-inline-flex flex-column">
                <input type="text" name="newTitle" id="newTitle" className="card-title h5 mb-0" autoComplete="off" placeholder="Note title" />
                <textarea name="newContent" id="newContent" cols="30" rows="3" className="card-text card-editable" placeholder="Write a note!"></textarea>
            </form>
        </div>
        <ColorEditer editState={editState} cancelEdit={() => cancelEdit()} saveEdit={saveEdit} />
    </React.Fragment>
    )
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);