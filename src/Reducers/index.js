import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import moment from 'moment';
import { defaultTodos } from './../state/store';


const filtersDefaultState = {
  titleFilter: {
    name: 'title',
    value: ''
  },
  createdAtFilter: {
    name: 'created_at',
    value: ''
  },
  page: 1
};

function todos(state = defaultTodos, action) {
  switch (action.type) {
    case 'ADD_TODO': {
      return [...state, {
        id: getRandomInt(),
        title: action.data.title,
        description: action.data.description,
        created_at: moment().format('DD/MM/YYYY'),
        isEdit: false
      }];
    }
    case 'REMOVE_TODO': {
      let index = state.map((elem) => { return elem.id }).indexOf(action.id);
      state.splice(index, 1);
      return [...state]
    }
    case 'EDIT_TODO': {
      let index = state.map((elem) => { return elem.id }).indexOf(action.id);
      let isEdit = {
        isEdit: !state[index].isEdit
      };
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], isEdit),
        ...state.slice(index + 1)
      ];
    }
    case 'SAVE_TODO': {
      let index = state.map((elem) => { return elem.id }).indexOf(action.data.id);
      let newData = {
        isEdit: !state[index].isEdit,
        title: action.data.title,
        description: action.data.description
      };
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], newData),
        ...state.slice(index + 1)
      ];
    }
    default:
      return state;
  }
}

function filters(state = filtersDefaultState, action) {
  switch (action.type) {
    case 'FILTER_TODO': {
      return action.filters
    }
    default:
      return state;
  }
}

function getRandomInt() {
  return Math.floor(Math.random() * 10000000000);
}

export default combineReducers({
  todos,
  filters,
  form: formReducer
});