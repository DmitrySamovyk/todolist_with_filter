import React, { Component } from 'react';
import TodoItem from './TodoItem';


class TodoList extends Component {

  constructor(context, props) {
    super(context, props);
  }

  render() {
    return (
      <div className={'todos'}>
        {this.props.renderedTodos.length ?
          this.props.renderedTodos.map(todoItem => {
            return (
              <TodoItem
                key={todoItem.id}
                todoData={todoItem}
              />
            )
          }) :
          <div className={'empty-block'}>
            <p>No todos for display</p>
          </div>}
      </div>
    );
  }

}

export default TodoList;
