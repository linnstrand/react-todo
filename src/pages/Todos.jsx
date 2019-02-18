import React, { Component } from 'react';
import TodoNew from '../components/Todo/TodoNew';
import Todo from '../components/Todo/Todo';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    todos: state.todos,
    editing: state.editing
});

class Todos extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            newTodo: { title: '', content: '', id: 0 }
        };
    }


    render() {
        return (
            <React.Fragment>
                <TodoNew />
                <div className={'d-inline-flex align-items-start flex-wrap' + (this.state.activeTodo === 0 ? ' is-active' : '')}>
                    {this.props.todos.map(todo => (
                        <Todo key={todo.id} todo={todo} checked={this.props.editing.checked.includes(todo.id)}
                            setActive={() => this.setState({ activeTodo: todo.id })}
                            isActive={this.props.editing.target === todo.id} />
                    ))}
                </div>
            </React.Fragment>
        );
    };
}
export default connect(mapStateToProps)(Todos);
