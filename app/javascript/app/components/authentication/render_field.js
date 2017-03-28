import React from 'react';
import Radium from 'radium';

const styles = {
  container: {
    width: '100%',
    padding: '10px 15px',
    fontFamily: 'open sans',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  inputContainer: {
    width: '100%',
    marginTop: '5px'
  },
  label: {
    fontWeight: '300',
    color: 'rgba(0,0,0,5)'
  },
  input: {
    width: '100%',
    maxWidth: '100%',
    borderRadius: '4px',
    outline: 'none',
    fontSize: '14px',
    color: '#02000D',
    boxSizing: 'border-box',
    padding: '8px 10px',
    border: '1px solid rgba(0,0,0,0.3)',
    ':focus': {
      outline: 'none',
      border: '1px solid #27D0B9',
    }
  },
  textarea: {
    outline: 'none',
    fontSize: '14px',
    color: '#02000D',
    width: '100%',
    height: '200px',
    border: '1px solid rgba(0,0,0,0.3)',
    ':focus': {
      outline: 'none',
      border: '1px solid #27D0B9',
    }
  },
  inputError: {
    border: '1px solid #EB524A'
  },
  spanError: {
    display: 'block',
    width: '100%',
    fontSize: '12px',
    color: '#EB524A'
  }
}

export const RenderField = (props) => {
  const { name, className, input, label, type, meta: { touched, error, warning } } = props;
  return (
    <div style={styles.container}>
      <label
        htmlFor={name}
        style={styles.label}
      >
        {label}
      </label>
      <div style={styles.inputContainer}>
        {
          ( type === "text" || type === "email" || type === "password" ) &&
          <input
            style={[styles.input, error && touched && styles.inputError]}
            type={type}
            {...input}
            placeholder={label}
          />
        }
        {
          type === "textarea" &&
          <textarea
            style={[styles.textarea, error && styles.inputError]}
            {...input}
            placeholder={label}
          />
        }
        {
          ( touched && ( error && <span style={styles.spanError}>{error}</span> )) ||
          ( warning &&  <span style={styles.spanError}>{warning}</span> )
        }
      </div>
    </div>
  )
}

RenderField.PropTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired
}

export default Radium()(RenderField);