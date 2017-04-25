import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

const styles = {
  base: {
    display: 'flex',
    boxSizing: 'border-box'
  },
  1: {
    width: '10%'
  },
  2: {
    width: '20%'
  },
  3: {
    width: '30%'
  },
  4: {
    width: '40%'
  },
  5: {
    width: '50%'
  },
  6: {
    width: '60%'
  },
  7: {
    width: '70%'
  },
  8: {
    width: '80%'
  },
  9: {
    width: '90%'
  },
  10: {
    width: '100%'
  }
}

export const Column = (props) => {
  const { children, width, minWidth, maxWidth, extraStyles } = props;
  return (
    <div
      style={[styles.base, width && styles[width], minWidth && {minWidth: minWidth}, maxWidth && {maxWidth: maxWidth}, extraStyles && {...extraStyles}]}>
      { children }
    </div>
  )
}

Column.propTypes = {
  handleClick: PropTypes.func,
  width: PropTypes.string,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  extraStyles: PropTypes.object
}

export default Radium()(Column);