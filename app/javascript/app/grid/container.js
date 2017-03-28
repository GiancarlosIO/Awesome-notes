import React from 'react';
import Radium from 'radium';

const styles = {
  base: {
    padding: '15px',
    display: 'flex',
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
  }
}

export const Container = (props) => {
  const { children, row, column, yCenter, xCenter, extraStyles } = props;
  return (
    <div
      style={[styles.base, extraStyles && {...extraStyles} ,row && styles.row, yCenter && styles.yCenter, column && styles.column, xCenter && styles.xCenter]}
    >
      {children}
    </div>
  )
}

export default Radium()(Container);