import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterTodo } from '../AC/index';


class Pagination extends Component {

  constructor(context, props) {
    super(context, props);
  }

  onPageChange = e => {
    const index = Array.prototype.indexOf.call(e.target.parentNode.children, e.target) + 1;
    if (this.props.filters.page === index) return false;
    let filters = {
      ...this.props.filters,
      page: index
    };
    this.props.filterTodo(filters);
  };

  goPrevPage = () => {
    if (this.props.filters.page === 1) return false;
    let filters = {
      ...this.props.filters,
      page: this.props.filters.page - 1
    };
    this.props.filterTodo(filters);
  };

  goNextPage = () =>  {
    if (this.props.filters.page === this.props.count) return false;
    let filters = {
      ...this.props.filters,
      page: this.props.filters.page + 1
    };
    this.props.filterTodo(filters);
  };

  render() {
    const pages = [];
    for (let i = 1; i <= this.props.count; i++) {
      pages.push(
        <li
          key={i}
          onClick={this.onPageChange}
          className={`pagination-list-item ${i === this.props.filters.page ? 'active' : ''}`}
        >
          {i}
        </li>
      );
    }

    return (
      <div className={'pagination-container'}>
        <div className={'pagination'}>
          <div
            className={'pagination-button prev'}
            onClick={this.goPrevPage}
          />
          <ul className={'pagination-list'}>
            {pages}
          </ul>
          <div
            className={'pagination-button next'}
            onClick={this.goNextPage}
          />
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    filters: state.filters
  }
}

function mapDispatchToProps(dispatch) {
  return {
    filterTodo: bindActionCreators(filterTodo, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);