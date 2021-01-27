import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { SignIn } from '../../store/modules/auth/auth.action';
import Logo from '../../assets/logo.png';

const Login = () => {

    const currentState = useSelector((state) => state.Auth);
  
    const [user, setUser] = useState({
      email: '',
      password: ''
    });
    const dispatch = useDispatch()
  
    const userLogin = (credentials) => dispatch(SignIn(credentials))
  
    const handleChange = e => {
      setUser({
        ...user,
        [e.target.name]: e.target.value
      })
    }
    const submitUser = (e) => {
      e.preventDefault()
      userLogin({
        email: user.email,
        password: user.password
      });
    }
    
    if(currentState.isAuthenticated){
      return <Redirect to='/' />
    }
  
      return (
        <div className="login-page-card">
          <div className="inline wrapper">
            <div className="card-title d-flex flex-column">
              <div className="d-flex mb-3">
                <img className="mr-1" src={Logo}></img>
                <p className="my-auto">Hipicon</p>
              </div>
              <p>Hoş Geldiniz</p>
            </div>
            <form className="custom-form" onSubmit={submitUser}>
              <div className="custom-form-group mb-3">
              <input type="text" name="email" onChange={handleChange} autoComplete="off" required />
              <label>Email</label>
              </div>
              <div className="custom-form-group">
              <input type="password" name="password" onChange={handleChange} required />
              <label>Password</label>
              </div>
                <button
                  className="mt-4 w-100 p-1"
                  type="submit"
                  disabled={ user.email === "" || user.password === ""  }
                >
                  Giriş Yap
              </button>
              </form>
          </div>
          </div>
      );
  }
  
  export default Login