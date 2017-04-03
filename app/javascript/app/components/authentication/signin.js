import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, Field } from 'redux-form';
import Header from '../navigation/header';
import renderField from './render_field';
import Container from '../../grid/container';
import Column from '../../grid/column';
import { validateSiginForm } from './form_validations';
import Button from '../../ui/buttons/button';
import { signinUser } from '../../actions/';

const styles = {
  base: {
    width: '100%',
    border: '1px solid rgba(0,0,0,0.2)',
    boxShadow: '2x 2px 5px rgba(0,0,0,0.4)',
    padding: '15px 10px',
    borderRadius: '5px'
  },
  maxContainer: {
    marginTop: '80px'
  },
  container: {
    display: 'flex',
    flexFlow: 'column',
    width: '330px'
  },
  buttonContainer: {
    width: '100%',
    padding: '15px',
    textAlign: 'center',
    boxSizing: 'border-box'
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'open sans',
    color: '#27D0B9',
    fontSize: '24px'
  },
  error: {
    backgroundColor: 'rgba(227, 0, 14, 0.2)',
    color: '#E3000E',
    fontSize: '12px',
    padding: '5px 25px',
    listStyle: 'none',
    borderRadius: '4px'
  }
}

class Signin extends Component {

  state = {
    loading: false
  }

  onSubmit = (values, dispatch, formProps) => {
    console.log('submitting', values);
    this.setState({loading: true}, () => {
      dispatch(signinUser(values))
          .catch(() => { this.setState({loading: false}) });
    })
  }

  renderErrors = () => {
    const { errors } = this.props;
    if ( errors.length > 0) {
      let errorsArray = errors.map((error, index) => (<li key={`error-${index}`}>{error}</li>));
      return (<ul style={styles.error}>{errorsArray}</ul>)
    }
  }

  render() {
    const { handleSubmit, pristine, submitting, error } = this.props;
    return (
      <div>
        <Header />
        <Container row xCenter extraStyles={styles.maxContainer}>
          <Column width="4" minWidth="330px" extraStyles={styles.container}>
            <form onSubmit={handleSubmit(this.onSubmit)} style={styles.base}>
              <h2 style={styles.title}>Sign in</h2>
              { this.renderErrors() }
              <Field
                name="email"
                type="email"
                component={renderField}
                label="Email"
              />
              <Field
                name="password"
                type="password"
                component={renderField}
                label="Password"
              />
              <div style={styles.buttonContainer}>
                <Button type="submit" bg="secondary" disabled={ this.state.loading }>
                  Sign in
                </Button>
              </div>
            </form>
          </Column>
        </Container>
      </div>
    )
  }
}

const SigninFormRadium = Radium()(Signin);

const SigininFormConfigured = reduxForm({
  form: 'signin',
  validate: validateSiginForm
})(SigninFormRadium);

function mapStateToProps(state) {
  return {
    errors: state.auth.errors
  }
}

export default connect(mapStateToProps)(SigininFormConfigured);