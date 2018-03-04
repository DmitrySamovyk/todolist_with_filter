import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  removeTodo,
  editTodo,
  saveTodo
} from '../../AC/index';


class Todo extends Component {

  constructor(context, props) {
    super(context, props);
    this.state = {
      errors: {
        title: false,
        description: false
      }
    }
  }

  saveTodoData = () => {
    if (!this.refs.title.value || !this.refs.description.value) {
      return this.setState({
        errors: {
          title: !this.refs.title.value,
          description: !this.refs.description.value
        }
      })
    }
    let data = {
      title: this.refs.title.value,
      description: this.refs.description.value,
      id: this.props.todoData.id
    };
    this.props.saveTodo(data)
  };

  editTodo = () => {
    this.props.editTodo(this.props.todoData.id);
  };

  handleFormSubmit = e => {
    if (e.charCode === 13) {
      this.saveTodoData();
    }
  };

  render() {
    return (
      <div className={'todo-single'}>
        { !this.props.todoData.isEdit ?
          <h1 className={'title'}>{this.props.todoData.title}</h1> :
          <input
            style={this.state.errors.title ? {border: '2px solid red'} : {} }
            type='text'
            ref={'title'}
            defaultValue={this.props.todoData.title}
            placeholder={'Todo title'}
            autoFocus
            onFocus={() => this.setState({
              errors: {
                ...this.state.errors,
                title: false
              }
            })}
            onKeyPress={e => this.handleFormSubmit(e)}
          />
        }
        <div
          className={'remove'}
          onClick={() => this.props.removeTodo(this.props.todoData.id)}
        />
        { !this.props.todoData.isEdit ?
          <p className={'description'}>{this.props.todoData.description}</p> :
          <input
            style={this.state.errors.description ? {border: '2px solid red'} : {} }
            type='text'
            ref={'description'}
            defaultValue={this.props.todoData.description}
            placeholder={'Description'}
            onFocus={() => this.setState({
              errors: {
                ...this.state.errors,
                description: false
              }
            })}
            onKeyPress={e => this.handleFormSubmit(e)}
          />
        }
        <p className={'created'}>Added: {this.props.todoData.created_at}</p>
        { !this.props.todoData.isEdit ?
          <button onClick={() => this.editTodo()}>Edit</button> :
          <button onClick={() => this.saveTodoData()}>Save</button>
        }
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    removeTodo: bindActionCreators(removeTodo, dispatch),
    editTodo: bindActionCreators(editTodo, dispatch),
    saveTodo: bindActionCreators(saveTodo, dispatch),
    dispatch
  };
}

export default connect(null, mapDispatchToProps)(Todo);
