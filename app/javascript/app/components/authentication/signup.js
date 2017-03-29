import React, { Component } from 'react';
import { connect  } from 'react-redux';
import { reduxForm, SubmissionError, Field } from 'redux-form';
import Radium from 'radium';
import Container from '../../grid/container';
import Column from '../../grid/column';
import { validateSignupForm } from './form_validations';
import RenderField from './render_field';
import Button from '../../ui/buttons/button';
import Header from '../navigation/header';

const styles = {
  base: {
    width: '100%',
    border: '1px solid rgba(0,0,0,0.2)',
    boxShadow: '2px 2px 5px rgba(0,0,0,0.4)',
    padding: '15px 10px',
    borderRadius: '5px'
  },
  maxContainer: {
    marginTop: '30px'
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
  }
}

class Signup extends Component {

  onSubmit = (values, dispatch, formProps) => {
    console.log('submitting', values);
  }

  render() {
    const { handleSubmit, pristine, submitting, error } = this.props;
    return (
      <div>
        <Header />
        <Container row xCenter extraStyles={styles.maxContainer}>
          <Column width="4" minWidth="330px" extraStyles={styles.container}>
            <form onSubmit={handleSubmit(this.onSubmit)} style={styles.base}>
              <h2 style={styles.title}>Sign up now!</h2>
              <Field
                name="email"
                type="email"
                component={RenderField}
                label="Email"
              />
              <Field
                name="password"
                type="password"
                component={RenderField}
                label="Password"
              />
              <Field
                name="passwordConfirmation"
                type="password"
                component={RenderField}
                label="Passsword confirmation"
              />
              <div style={styles.buttonContainer}>
                <Button type="submit" bg="primary" disabled={ pristine || submitting }>
                  Register
                </Button>
              </div>
            </form>
          </Column>
        </Container>
      </div>
    )
  }
}

const SignupFormConfigured = reduxForm({
  form: 'signup',
  validate: validateSignupForm
})(Signup)

export default connect()(SignupFormConfigured);