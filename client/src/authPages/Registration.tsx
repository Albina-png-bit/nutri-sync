import React, { useEffect, useState } from 'react';
import './Registration.css';
import axios from 'axios';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const [inputs, setInputs] = useState({
    login: '',
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  //   const navigate = useNavigate();
  //   const { name } = useAppSelector((store) => store.userReducer);
  //   const dispatch = useAppDispatch();

  //   useEffect(() => {
  //     if (name) {
  //       navigate('/main');
  //     }
  //   }, [name]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const regHandler = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/reg',
        {
          login: inputs.login,
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 201) {
        console.log('УСПЕШНАЯ РЕГИСТРАЦИЯ');
        // dispatch({ type: 'SET_USER', payload: response.data });
        // navigate('/main');
      } else if (response.status === 200) {
        console.log('НЕУСПЕШНАЯ РЕГИСТРАЦИЯ');
        setError(response.data.error);
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
    }
  };

  return (
    <div className="container column border">
      <h1>Регистрация</h1>
      <input
        name="login"
        type="text"
        placeholder="Login"
        onChange={handleInputChange}
      />
      <br />
      <input
        name="name"
        type="text"
        placeholder="Name"
        onChange={handleInputChange}
      />
      <br />
      <input
        name="email"
        type="text"
        placeholder="Email"
        onChange={handleInputChange}
      />
      <br />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleInputChange}
      />
      <br />
      <button onClick={regHandler}>Регистрация</button>
      {error && <div>{error}</div>}
    </div>
  );
}
