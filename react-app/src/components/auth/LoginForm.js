import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'; 

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };
  useEffect(() => {
    let loginButton = document.querySelector(".loginBtn");
    console.log(email)
    if (email && password) {
      loginButton.classList.remove("disabled");
      loginButton.removeAttribute("disabled");
    } else {
      loginButton.classList.add("disabled");
      loginButton.setAttribute("disabled", "");
    }
  }, [email, password])


  const updateEmail = (e) => { 
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = (e) => {
    setEmail('demo@aa.io');
    setPassword('password');
  }

  const demo2Login = (e) => {
    setEmail('ddemo2@aa.io')
    setPassword('password')
  }
 
  if (user) {
    return <Redirect to='/' />;
  }
  
  return (
    <div className="pageContainer">
      <div className="main">
        <div className="loginRedirectContainer">
          <form onSubmit={onLogin} className='loginContainer'>
            <div className="loginTitle">Ziba</div>
            {errors.map((error, ind) => (
                <div className='errorText' key={ind}>{error}</div>
              ))}
            <div className="loginFormContainer">
              <div>
                <input
                  className='loginField'
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div>
                <input
                  className='loginField'
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <button className='loginBtn blueButton button' type='submit'>Login</button>
              <div className="orContainer">
                <div className="line" />
                <span className="orText">OR</span>
                <div className="line" />
              </div>
              <div className="demoContainer" onClick={demoLogin}>
                <button className='demo' type='submit'>Log in with Demo 1</button>
              </div>
              <div className="demoContainer">
                <button type='submit' className="demo" onClick={demo2Login}>Log in with Demo 2</button>
              </div>
            </div>
            <div className='errorContainer'>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;