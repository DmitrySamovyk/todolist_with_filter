import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTodo } from '../AC/index';
import {
  Field,
  reduxForm
} from 'redux-form';


class AddTodo extends Component {

  constructor( context, props) {
    super(context, props);
    this.state = {
      errors: {
        title: false,
        description: false
      }
    }
  }

  formSubmit = (values) => {
    if (!values.title || !values.description) {
      return this.setState({
        errors: {
          title: !values.title,
          description: !values.description
        }
      })
    }
    this.props.addTodo(values);
    this.props.reset();
  };

  handleFormSubmit = (e) => {
    if (e.charCode === 13) {
      this.props.handleSubmit(this.formSubmit)
    }
  };

  render() {
    return (
      <form className={'add-form-wrap'}
            onSubmit={this.props.handleSubmit(this.formSubmit)}
      >
        <h1>Add new todo Item:</h1>
        <label htmlFor='title'>Title</label>
        <Field
          style={this.state.errors.title ? {border: '2px solid red'} : {} }
          name={'title'}
          component={'input'}
          type={'text'}
          placeholder={'Todo title'}
          id={'title'}
          onFocus={() => this.setState({
            errors: {
              ...this.state.errors,
              title: false
            }
          })}
          onKeyPress={e => this.handleFormSubmit(e)}
        />
        <label htmlFor='description'>Description</label>
        <Field
          style={this.state.errors.description ? {border: '2px solid red'} : {} }
          name={'description'}
          component={'input'}
          type={'text'}
          placeholder={'Todo description'}
          id={'description'}
          onFocus={() => this.setState({
            errors: {
              ...this.state.errors,
              description: false
            }
          })}
          onKeyPress={e => this.handleFormSubmit(e)}
        />
        <button>
          Submit
        </button>
      </form>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: bindActionCreators(addTodo, dispatch),
    dispatch
  };
}

AddTodo = reduxForm({
  form: 'addTodo'
})(AddTodo);

export default connect(null, mapDispatchToProps)(AddTodo);
