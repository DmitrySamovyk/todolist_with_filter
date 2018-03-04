import React, { Component } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import { filterTodo } from '../AC/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Filter extends Component {

  constructor(context, props) {
    super(context, props);
    this.state = {
      titleFilter: {
        name: 'title',
        value: this.props.filters.titleFilter.value ? this.props.filters.titleFilter.value : ''
      },
      createdAtFilter: {
        name: 'created_at',
        value: this.props.filters.createdAtFilter.value ? this.props.filters.createdAtFilter.value : ''
      }
    }
  }

  onTitleFilterChange = e => {
    this.setState({
      ...this.state,
      titleFilter: {
        ...this.state.titleFilter,
        value: e.target.value
      }
    }, () => {
      let filters = Object.assign(this.state, {page: 1});
      this.props.filterTodo(filters)
    })
  };

  onDateFilterChange = value => {
    let d = moment(value, 'DD/MM/YYYY');
    if (d === null || !d.isValid()) {
      return this.setState({
        ...this.state,
        createdAtFilter: {
          ...this.state.createdAtFilter,
          value: ''
        }
      }, () => {
        let filters = Object.assign(this.state, {page: 1});
        this.props.filterTodo(filters)
      })
    }
    this.setState({
      ...this.state,
      createdAtFilter: {
        ...this.state.createdAtFilter,
        value: moment(value).format('DD/MM/YYYY')
      }
    },  () => {
      let filters = Object.assign(this.state, {page: 1});
      this.props.filterTodo(filters)
    })
  };

  clearFilters = () => {
    this.setState({
      titleFilter: {
        ...this.state.titleFilter,
        value: ''
      },
      createdAtFilter: {
        name: 'created_at',
        value: ''
      }
    }, () => {
      let filters = Object.assign(this.state, {page: 1});
      this.props.filterTodo(filters)
    })
  };

  render() {
    return (
      <div className={'filter'}>
        <h1>Filter by:</h1>
        <label>Title</label>
        <input
          type='text'
          placeholder={'Title'}
          value={this.state.titleFilter.value}
          onChange={e => this.onTitleFilterChange(e)}
        />
        <label>Date</label>
        <Datetime
          dateFormat={'DD/MM/YYYY'}
          timeFormat={false}
          closeOnSelect={true}
          onBlur={value => this.onDateFilterChange(value)}
          onChange={value => this.onDateFilterChange(value)}
          value={this.state.createdAtFilter.value}
          inputProps={{placeholder: 'Date'}}
        />
        <div className={'clear-wrap'}>
          <button onClick={() => this.clearFilters()}>
            Clear filters
          </button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    filterTodo: bindActionCreators(filterTodo, dispatch),
    dispatch
  }
}

function mapStateToProps(state) {
  return {
    filters: state.filters
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
