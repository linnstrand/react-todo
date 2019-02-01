import React from 'react'
import CardTodo from '../components/todo';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { todos: state.todos };
};

const Home = ({ todos }) => {
    return (
        <div className="d-inline-flex align-items-start">
            {todos.map((item) => <CardTodo key={item.name} todo={item} className="shadow-sm card m-2" />)}
        </div>

    );
}

export default connect(mapStateToProps)(Home);