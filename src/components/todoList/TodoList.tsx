import React from 'react';
import { useAppDispatch } from '../../redux/store';
import '../todoList/todoList.styles.scss';
import {
  editTodos,
  fetchTodos,
  deleteTodo,
  filterCompletedTodos,
  filterInCompletedTodos,
} from '../../redux/slices/apiDataSlice';
import spinner from '../../assets/spinner.gif';
import checkImage from '../../assets/checkmark.png';

//COMPONENT
const TodoList: React.FC<any> = ({
  todoData,
  pendingState,
  theme,
  themeFromLS,
}) => {
  const dispatch = useAppDispatch();

  const handleEdit = (event: any, data: any) => {
    event.preventDefault();
    dispatch(editTodos(data)).then(() => dispatch(fetchTodos()));
  };

  const handleTodoEdit = (event: any, data: any) => {
    if (event.key === 'Enter') {
      handleEdit(event, data);
    } else {
      return;
    }
  };

  //JSX
  return (
    <div
      className={
        theme === 'dark' || themeFromLS === 'dark'
          ? 'listContainer-dark'
          : 'listContainer'
      }
    >
      <div className="listWrapper">
        <div className="filterContainer">
          <ul
            className={
              theme === 'dark' || themeFromLS === 'dark'
                ? 'filterWrapper-dark'
                : 'filterWrapper'
            }
          >
            <li
              style={
                theme === 'dark' || themeFromLS === 'dark'
                  ? { color: 'white' }
                  : { color: 'black' }
              }
              className="allTodos"
              onClick={() => dispatch(fetchTodos())}
            >
              All
            </li>
            <li
              className="completedTodos"
              onClick={() =>
                dispatch(fetchTodos()).then(() =>
                  dispatch(filterCompletedTodos())
                )
              }
            >
              Completed
            </li>
            <li
              className="inCompletedTodos"
              onClick={() =>
                dispatch(fetchTodos()).then(() =>
                  dispatch(filterInCompletedTodos())
                )
              }
            >
              Not Completed
            </li>
          </ul>
        </div>
        <ul>
          {pendingState.pending && (
            <img className="spinner" src={spinner} alt="spinner" />
          )}
          {todoData?.map((item: any, i: any) => (
            <div
              key={item.id}
              className={
                theme === 'dark' || themeFromLS === 'dark'
                  ? 'itemWrapper-dark'
                  : 'itemWrapper'
              }
            >
              {item.editMode === false ? (
                <li
                  style={
                    theme === 'dark' || themeFromLS === 'dark'
                      ? { color: 'white' }
                      : { color: 'black' }
                  }
                  className={
                    item.isCompleted === false
                      ? 'listItem'
                      : 'listItemCompleted'
                  }
                  onClick={(event: any) => {
                    handleEdit(event, {
                      isCompleted: !item.isCompleted,
                      id: Number(item.id),
                    });
                  }}
                >
                  {item.isCompleted && (
                    <img className="checkImage" src={checkImage} alt="tick" />
                  )}
                  {item?.content}
                </li>
              ) : (
                <input
                  onKeyPress={(event: any) => {
                    event.target.value.length > 3 &&
                      handleTodoEdit(event, {
                        editMode: !item.editMode,
                        id: Number(item.id),
                        content: event.target.value,
                      });
                  }}
                  className="editInput"
                />
              )}
              <div className="btnsContainer">
                <button
                  disabled={item.editMode === true}
                  className="editBtn"
                  onClick={(event: any) =>
                    handleEdit(event, {
                      editMode: !item.editMode,
                      id: Number(item.id),
                    })
                  }
                >
                  Edit
                </button>
                <button
                  className="deleteBtn"
                  onClick={() =>
                    dispatch(deleteTodo(item.id)).then(() =>
                      dispatch(fetchTodos())
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
