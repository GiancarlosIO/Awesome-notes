import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function(ComponseComponent) {
  class HideAuth extends Component {
    render() {
      const { authenticated } = this.props;
      return !authenticated ?
      (<ComponseComponent {...this.props} />) :
      (<Redirect to={{ pathname: '/notes', state: { from: this.props.location } }} />)
    }
  };

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated
    };
  };

  return connect(mapStateToProps)(HideAuth);
}