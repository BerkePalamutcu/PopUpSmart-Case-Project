import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Todos from '../pages/Todos';
const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/todos" element={<Todos />} />
    </Routes>
  );
};

export default Navigation;
