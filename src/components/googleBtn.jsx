
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {useDispatch} from 'react-redux';
import {login} from '../actions'
import {store,persistor} from '../store'
const CLIENT_ID = '1084512785168-9no6rgfvkralio08vd4k36fvc5c0gnsp.apps.googleusercontent.com';
                   

class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: store.getState().isLogged.isLoggedIn,
      accessToken: store.getState().isLogged.name
    };
    console.log(store.getState());
  }

  login = (response) => {
    console.log(response);
    console.log(response.accessToken);
    if(response){
      this.setState(state => ({
        isLogined: true,
        accessToken: response.profileObj.name
      }));
    }
    console.log(store);
    store.dispatch({
        type: 'SIGN_IN',
        payload: {
          emailId: 'gmail2',
          name : response.profileObj.name,
        }
      });
  }

  logout = (response) => {
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));
    store.dispatch({
        type: 'SIGN_OUT',
        payload: {
          emailId: 'gmail3'
        }
      });
  }

  handleLoginFailure = (response) => {
    console.log(response);
    alert('Failed to log in')
  }

  handleLogoutFailure = (response) =>{
    alert('Failed to log out')
  }

  render() {
    return (
    <div>
      { this.state.isLogined ?
        <GoogleLogout
          clientId={ CLIENT_ID }
          buttonText= 'Logout'
          onLogoutSuccess={ this.logout }
          onFailure={ this.handleLogoutFailure }
        >
        </GoogleLogout>: 
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText='Login'
          onSuccess={ this.login }
          onFailure={ this.handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
        />
      }

      { this.state.accessToken ? <h5>Welcome { this.state.accessToken }</h5> : null }

    </div>
    )
  }
}

export default GoogleBtn;