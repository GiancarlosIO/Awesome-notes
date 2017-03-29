import React from 'react';
import Radium from 'radium';
import LinkHeader from '../navigation/link-header';

const styles = {
  base: {
    width: '90vw',
    margin: '0 auto',
    backgroundColor: '#64C4AF',
    height: '400px',
    fontSize: '24px',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'calc( 100vh - 550px )'
  }
}

export const NoFound = (props) => {
  return (
    <div style={styles.base}>
      <h1>404-NO MATCH</h1>
      <div>
        <LinkHeader path="/" noStyles>
          Return to home
        </LinkHeader>
      </div>
    </div>
  )
}

export default Radium()(NoFound);