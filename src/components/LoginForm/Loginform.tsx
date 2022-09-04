import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../LoginForm/loginForm.styles.scss';

const Loginform = () => {
  const redirect = useNavigate();
  const [name, setName] = React.useState('');

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const localstorageHandler = (name: string) => {
    localStorage.setItem('userName', name);
  };

  const redirectToTodos = () => {
    if (name.length > 0) {
      redirect('/todos');
    }
  };
  
  return (
    <div className="loginFormContainer">
      <form className="loginForm">
        <h1>login to continue</h1>
        <div className="inputWrapper">
          <label>Name</label>
          <input
            required
            value={name}
            onChange={(event) => handleNameChange(event)}
            placeholder="Enter your name"
            type="text"
          />
        </div>
        <div className="buttonWrapper">
          <button
            onClick={() => {
              localstorageHandler(name);
              redirectToTodos();
            }}
            className="login"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Loginform;
