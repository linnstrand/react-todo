export const setBullet = t => {
  let todo = Object.assign({}, t);
  let content = todo.content;
  if (!content) {
    todo.content = '<ul><li></li></ul>';
    return todo;
  }
  if (content.includes('<li>')) {
    content = content.replace(/(<ul>||<\/ul>)+/g, '');
    content = content.replace(/li>+/g, 'div>');
  } else {
    content = content.replace(/div>+/g, 'li>');
    if (!content.startsWith('<li>')) {
      content = `<li>${content}</li>`;
    }
    content = `<ul>${content}</ul>`;
  }
  todo.content = content;
  return todo;
};

export const cleanTodo = t => {
  let todo = Object.assign({}, t);
  let content = todo.content.replace('<li></li>', '');
  content = todo.content.replace('<li><br></li>', '');
  todo.content = content;
  return todo;
};
