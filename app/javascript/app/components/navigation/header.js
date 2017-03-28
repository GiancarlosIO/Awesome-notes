import React from 'react';
import Radium, { Style } from 'radium';
import Link from './link';
import Column from '../../grid/column';

const styles = {
  base: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid black',
    width: '100%',
    height: '60px',
    boxSizing: 'border-box',

  },
  hoverLink: {
    borderBottomColor: '#27AE60 !important'
  },
  flexEnd: {
    flexFlow: 'row',
    justifyContent: 'flex-end'
  }
}

const Header = () => {
  return (
    <header>
      <nav style={styles.base}>
        <Column width={6}>
          <Link path="/" exact left>
            Logo
          </Link>
        </Column>
        <Column width={4} style={styles.flexEnd}>
          <Link path="/signup">
            Sign up
          </Link>
          <Link path="/signup">
            Sign in
          </Link>
        </Column>
      </nav>
      <Style
        scopeSelector=".nav__link:hover"
        rules= {styles.hoverLink}
      />
      <Style
        scopeSelector="nav div:nth-child(2)"
        rules= {styles.flexEnd}
      />
    </header>
  )
}

export default Radium()(Header);