import React from 'react'
import { editColor, toggleEdit } from '../actions';
import CardTodo from '../components/todo';
import { connect } from 'react-redux';
import ColorEditer from '../components/colorEditer';

const mapStateToProps = state => ({
    todos: state.todos, editState: state.editState
});

const mapDispatchToProps = dispatch => {
    return {
        editColor: name => dispatch(editColor(name))
    }
}


// const editColor = (props) => {
//     console.log(props);
// }

const Home = ({ todos, editState, editColor }) => (
    <React.Fragment>
        <h3>{editState.name}</h3>
        <div className="d-inline-flex align-items-start">
            {todos.map((item) => <CardTodo key={item.name} todo={item} editColor={editColor} className="shadow-sm card m-2" />)}
        </div>
        <ColorEditer editState={editState} />
    </React.Fragment>
);


export default connect(mapStateToProps, mapDispatchToProps)(Home);