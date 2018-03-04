export const loadState = () => {
  try {
    const todos = localStorage.getItem('TodoList');
    if ( todos === null) {
      return {};
    }
    return JSON.parse(todos).state;
  } catch (err) {
    return {};
  }
};

export const saveState = state => {
  try {
    const todos = JSON.stringify({state});

    localStorage.setItem('TodoList', todos);
  } catch (err) {
    // Ignore errors
  }
};