
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {useDispatch} from 'react-redux';
import {login,logoutAction} from '../actions'
import {store,persistor} from '../store'
          
const CLIENT_ID = '1084512785168-9no6rgfvkralio08vd4k36fvc5c0gnsp.apps.googleusercontent.com';

class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: store.getState().isLogged.isLoggedIn,
      accessToken: store.getState().isLogged.name
    };
  }

  loginfun = (response) => {

    if(response){
      this.setState(state => ({
        isLogined: true,
        accessToken: response.profileObj.name
      }));
    }
    
    store.dispatch(login(response.profileObj.email,response.profileObj.name,response.tokenId));
  }

  logout = (response) => {
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));
    store.dispatch(logoutAction(store.getState().isLogged.emailId,store.getState().isLogged.name));
    store.dispatch({
              type: 'SAVE',
              payload: {
                nodes : [],
                isLoaded: false
              }
            });
  }

  handleLoginFailure = (response) => {
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
          onSuccess={ this.loginfun }
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