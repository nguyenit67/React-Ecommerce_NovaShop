import React, { useState } from 'react';
import TodoList from './components/TodoList';

TodoFeature.propTypes = {};

function TodoFeature(props) {
  const initialTodoList = [
    {
      id: 1,
      title: 'Metal',
      status: 'new',
    },
    {
      id: 2,
      title: 'Granite',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Wooden',
      status: 'new',
    },
  ];

  const [todoList, setTodoList] = useState(initialTodoList);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleTodoClick = (todo, idx) => {
    // clone current todo list
    const newTodoList = [...todoList];

    // toggle state
    newTodoList[idx] = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === 'new' ? 'completed' : 'new',
    };

    // update todo list
    setTodoList(newTodoList);
  };

  const handleShowAllClick = () => {
    setFilterStatus('all');
  };

  const handleShowCompletedClick = () => {
    setFilterStatus('completed');
  };

  const handleShowNewClick = () => {
    setFilterStatus('new');
  };

  const renderedTodoList = todoList.filter((todo) => {
    return filterStatus === 'all' || filterStatus === todo.status;
  });

  return (
    <div>
      <h3>Todo List</h3>
      <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick} />

      <div>
        <button onClick={handleShowAllClick}>Show All</button>
        <button onClick={handleShowCompletedClick}>Show Completed</button>
        <button onClick={handleShowNewClick}>Show New</button>
      </div>
    </div>
  );
}

export default TodoFeature;
