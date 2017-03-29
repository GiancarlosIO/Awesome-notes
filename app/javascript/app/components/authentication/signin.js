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
  }
}

class Signin extends Component {

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
              <h2 style={styles.title}>Sign in</h2>
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
                <Button type="submit" bg="secondary" disabled={ pristine || submitting }>
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
export default connect()(SigininFormConfigured);