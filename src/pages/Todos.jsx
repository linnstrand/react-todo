import React, { Component } from 'react';
import { addTodo, deleteNew } from '../actions';
import TodoPlaceHolder from '../components/Todo/TodoPlaceHolder';
import TodoEditing from '../containers/TodoEditing';
import TodoNew from '../containers/TodoNew';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    todos: state.todos,
    editing: state.editing,
    newTodo: state.newTodo
});

const mapDispatchToProps = dispatch => {
    return {
        addTodo: todo => dispatch(addTodo(todo)),
        deleteNew: id => dispatch(deleteNew(id))
    };
};

const withTodoPlaceholder = WrappedComponent => ({ newTodo, ...others }) => {
    return !newTodo.content ? <TodoPlaceHolder newTodo={newTodo} {...others} /> : <WrappedComponent todo={newTodo} {...others} />;
};

const TodoPlaceholder = withTodoPlaceholder(TodoNew);

class Todos extends Component {
    doneNewTodo = () => {
        this.props.addTodo(Object.assign({}, this.props.newTodo));
        this.props.deleteNew();
    };

    doneTodo = () => {
        // actions on finished with todo
    };

    render() {
        return (
            <React.Fragment>
                <TodoPlaceholder
                    newTodo={this.props.newTodo}
                    checked={this.props.editing.checked.includes(this.props.newTodo.id)}
                    isActive={this.props.editing.target === this.props.newTodo.id}
                    doneTodo={this.doneNewTodo}
                />
                <div className={'d-inline-flex align-items-start flex-wrap' + (this.props.editing.activeTodo === 0 ? ' is-active' : '')}>
                    {this.props.todos.map(todo => (
                        <TodoEditing
                            key={todo.id}
                            todo={todo}
                            checked={this.props.editing.checked.includes(todo.id)}
                            setActive={() => this.setState({ activeTodo: todo.id })}
                            isActive={this.props.editing.target === todo.id}
                            doneTodo={this.doneTodo}
                        />
                    ))}
                </div>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
