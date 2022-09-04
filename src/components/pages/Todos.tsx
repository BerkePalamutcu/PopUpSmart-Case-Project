import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import TodoInput from '../todoInput/TodoInput';
import TodoList from '../todoList/TodoList';
import { fetchTodos } from '../../redux/slices/apiDataSlice';
import { getThemeFromLocalStorage } from '../../redux/slices/viewModeSlice';

const Todos: React.FC = () => {
  const dispatch = useAppDispatch();
  const todoData: any = useAppSelector<any>((state) => state.getApi.todoData);
  const pendingState: any = useAppSelector<any>((state) => state.getApi);

  let theme: string = useAppSelector((state) => state.changeViewMode.theme);
  let themeFromLS = localStorage.getItem('theme');

  React.useEffect(() => {
    dispatch(fetchTodos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    dispatch(getThemeFromLocalStorage(theme));
  }, [theme, dispatch]);

  return (
    <div>
      <TodoInput theme={theme} themeFromLS={themeFromLS} />
      <TodoList
        themeFromLS={themeFromLS}
        theme={theme}
        todoData={todoData}
        pendingState={pendingState}
      />
    </div>
  );
};

export default Todos;
