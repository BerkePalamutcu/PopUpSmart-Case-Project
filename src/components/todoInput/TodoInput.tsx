import React from 'react';
import { postTodos } from '../../redux/slices/apiDataSlice';
import { fetchTodos } from '../../redux/slices/apiDataSlice';
import { useAppDispatch } from '../../redux/store';
import {
  setThemeToDark,
  setThemeToLight,
} from '../../redux/slices/viewModeSlice';
import '../todoInput/todoInput.styles.scss';
import moonSymbol from '../../assets/icon-moon.svg';
import sunSymbol from '../../assets/icon-sun.svg';

const TodoInput: React.FC<any> = ({ theme, themeFromLS }) => {
  const [inputValue, setInputValue] = React.useState('');
  const dispatch = useAppDispatch();
  const name = localStorage.getItem('userName');

  const changeToDarkTheme = () => {
    localStorage.setItem('theme', 'dark');
    dispatch(setThemeToDark());
  };

  const changeToLightTheme = () => {
    localStorage.setItem('theme', 'light');
    dispatch(setThemeToLight());
  };
  
  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const postTodo = (event: any, data: any) => {
    event.preventDefault();
    dispatch(postTodos(data)).then(() => dispatch(fetchTodos()));
    setInputValue('');
  };

  return (
    <div
      className={theme === 'dark' ? 'inputContainer-dark' : 'inputContainer'}
    >
      <div className="inputTodoWrapper">
        <h1 className="header">
          {name}'s todo list
          {theme === 'dark' || themeFromLS === 'dark' ? (
            <img
              className="sunSymbol"
              src={sunSymbol}
              alt="sun"
              onClick={changeToLightTheme}
            />
          ) : (
            <img
              className="moonSymbol"
              src={moonSymbol}
              alt="moon"
              onClick={changeToDarkTheme}
            />
          )}
        </h1>

        <form className="todoInputForm">
          <input
            className="todoInput"
            type="text"
            value={inputValue}
            onChange={handleChange}
          />
          <button
            disabled={inputValue.length < 3}
            onClick={(event) =>
              postTodo(event, {
                content: inputValue,
                userName: name,
                isCompleted: false,
              })
            }
            className="todoButton"
          >
            Add Todos
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoInput;
