import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

const styles = {
  base: {
    margin: '0 10px',
    width: '20px',
    borderRadius: '4px',
    padding: '5px',
    fontSize: '18px',
    color: '#16a085',
    fontWeight: '300',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
      transform: 'scale(1.2)',
      backgroundColor: 'rgba(0,0,0,0.05)'
    }
  }
}

const Icon = ({type, title, extraStyles, handleClick}) =>
  (
    <div
      style={[styles.base, extraStyles && {...extraStyles}]}
      title={title}
      onClick={handleClick}>
        <i className={`fa fa-${type}`} />
    </div>
  )

Icon.proptypes = {
  type: PropTypes.string.isRequired
}

export default Radium()(Icon);
