import React, { Component } from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

const styles = {
  base: {
    padding: '10px 15px',
    fontSize: '14px',
    fontFamily: 'open-sans',
    border: '1px solid transparent',
    color: '#fff',
    outline: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    ':hover': {
      boxShadow: '0 5px 5px rgba(0,0,0,0.4)'
    }
  },
  default: {
    backgroundColor: '#D1D5D8'
  },
  primary: {
    backgroundColor: '#3498DB'
  },
  secondary: {
    backgroundColor: '#1ABC9C'
  },
  tertiary: {
    backgroundColor: '#F1C40F'
  },
  danger: {
    backgroundColor: '#E74C3C'
  }
}

export const Button = ({ type, bg, children, disabled }) => {
    return (
      <button style={[styles.base, styles[bg]]} type={type} disabled={disabled}>
        { children }
      </button>
    )
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}

export default Radium()(Button);