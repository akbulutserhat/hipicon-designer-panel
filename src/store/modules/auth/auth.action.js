import * as authTypes from './auth.types';
import API_ROUTE from '../../../apiRoute';
import {history} from '../../../history';


export const SignIn = (credentials) => {
    return async  (dispatch) => {
      dispatch({ type: authTypes.LOGIN_REQUEST }) 
      try {
        const res =  await fetch(`${API_ROUTE}/user/login`,{
          method: 'POST',
          headers: {
              "Content-type": "application/json"
          },
          body: JSON.stringify(credentials)
        })
        let data = res.json()
        let token = data.token        
        dispatch({ type: authTypes.LOGIN_SUCCESS, payload: token })
      } catch(err) {
        dispatch({ type: authTypes.AUTH_ERROR, payload: err.response })
      }
    }
  }
  
  export const SignOut = () => {
    return (dispatch) => {
      dispatch({type: authTypes.LOGOUT_REQUEST})
        try {
        dispatch({ type: authTypes.LOGOUT_SUCCESS })
        history.push('/login');
        } catch(err) {
            dispatch({ type: authTypes.AUTH_ERROR, payload: err })
        }
      
    }
  }
