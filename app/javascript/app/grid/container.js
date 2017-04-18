import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

const styles = {
  base: {
    padding: '15px',
    display: 'flex',
    flexFlow: 'row wrap',
    width: '100%',
    boxSizing: 'border-box'
  },
  row: {
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
  },
  yCenter: {
    alignItems: 'center'
  },
  xCenter: {
    justifyContent: 'center'
  },
  noPadding: {
    padding: '0 !important'
  }
}

export const Container = (props) => {
  const { children, row, column, yCenter, xCenter, extraStyles, noPadding } = props;
  return (
    <div
      style={[styles.base, extraStyles && {...extraStyles},
              row && styles.row, yCenter && styles.yCenter,
              column && styles.column,
              xCenter && styles.xCenter,
              noPadding && styles.noPadding
            ]}
    >
      {children}
    </div>
  )
}

Container.propTypes = {
  row: PropTypes.bool,
  column: PropTypes.bool,
  xCenter: PropTypes.bool,
  noPadding: PropTypes.bool,
  extraStyles: PropTypes.object
}

export default Radium()(Container);