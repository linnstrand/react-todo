import React from 'react'
import CardTodo from '../components/todo';

const Home = (props) => {
    return (
        <div className="d-inline-flex">
            {props.todos.map((item) => <CardTodo key={item.name} todo={item} className="shadow-sm card m-2" />)}
        </div>

    );
}

export default Home;