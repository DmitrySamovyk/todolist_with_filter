import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddTodo from './AddTodo';
import Filter from './Filter';
import TodoList from './Todo/TodoList';
import Pagination from './Pagination';


class App extends Component {

  constructor(context, props) {
    super(context, props);
  }

  render() {
    return (
      <div className={'container'}>
        <AddTodo/>
        <div className={'filter-todos-wrap'}>
          <Filter/>
          <TodoList renderedTodos={this.props.todos.renderedTodos}/>
        </div>
        { this.props.todos.filteredTodos.length > 3 ?
          <Pagination
            count={Math.ceil(this.props.todos.filteredTodos.length / 3)}
          /> :
          null
        }
      </div>
    );
  }

}

function renderedTodo(todos, filters) {
  let filteredTodos =  todos.filter(todo => {
    return ~todo[filters.titleFilter.name].indexOf(filters.titleFilter.value) &&
      ~todo[filters.createdAtFilter.name].indexOf(filters.createdAtFilter.value)
  });
  let renderedTodos = filteredTodos.slice((filters.page - 1) * 3, (filters.page - 1) * 3 + 3);
  if (!renderedTodos.length && filters.page !== 1) {
    filters.page = filters.page - 1;
    let renderedTodos = filteredTodos.slice((filters.page - 1) * 3, (filters.page - 1) * 3 + 3);
    return {renderedTodos, filteredTodos};
  }
  return {renderedTodos, filteredTodos};
}

function mapStateToProps(state) {
  return {
    todos: renderedTodo(state.todos, state.filters)
  }
}

export default connect(mapStateToProps, null)(App);