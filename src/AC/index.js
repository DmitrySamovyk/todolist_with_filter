export function addTodo(data) {
  return { type: 'ADD_TODO', data };
}

export function editTodo(id) {
  return { type: 'EDIT_TODO', id };
}

export function saveTodo(data) {
  return { type: 'SAVE_TODO', data };
}

export function removeTodo(id) {
  return { type: 'REMOVE_TODO', id };
}

export function filterTodo(filters) {
  return { type: 'FILTER_TODO', filters };
}