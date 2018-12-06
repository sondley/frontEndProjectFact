import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//Components
import LoginForm from '../../components/login-form/loginform';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toRegister: false
    }
  }

  handleNavigate = (e) => {
    e.preventDefault();
    this.setState({ toRegister: true });
  }

  render() {
    if (this.state.toRegister === true) {
      return <Redirect push to='/register' />
    }

    return (
      <div id="login">
        <div className="loginContainer">
          <LoginForm active navigate={this.handleNavigate} />
        </div>
      </div>
    );
  }
}

export default LoginScreen;
