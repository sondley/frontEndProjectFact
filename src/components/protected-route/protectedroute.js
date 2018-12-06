import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { omit } from 'lodash';

class ProtectedRoute extends Component {

  render() {
    const newProps = omit(this.props, "isLoggedIn");
    const { isLoggedIn } = this.props;

    return (
      isLoggedIn ? (<Route {...newProps} />) : (<Redirect to="/" />)
    );
  }
}

export default ProtectedRoute;
