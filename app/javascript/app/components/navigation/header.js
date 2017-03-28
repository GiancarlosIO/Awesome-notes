import React from 'react';
import Radium, { Style } from 'radium';
import LinkHeader from './link-header';
import Column from '../../grid/column';

const styles = {
  base: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '80px',
    boxSizing: 'border-box',
    paddingBottom: '10px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
  },
  hoverLink: {
    color: '#EB524A !important',
    borderBottomColor: '#EB524A !important'
  },
  flexCenter: {
    flexFlow: 'row',
    justifyContent: 'center'
  },
  logo: {
    width: '200px',
    height: '60px',
    backgroundColor: '#432E41',
    marginTop: '10px'
  }
}

export const Header = () => {
  return (
    <header>
      <nav style={styles.base}>
        <Column width={6}>
          <LinkHeader path="/" exact noStyles>
            <div className="logo" style={styles.logo}></div>
          </LinkHeader>
        </Column>
        <Column width={4} style={styles.flexEnd}>
          <LinkHeader path="/">
            Home
          </LinkHeader>
          <LinkHeader path="/signup">
            Sign up
          </LinkHeader>
          <LinkHeader path="/signin">
            Sign in
          </LinkHeader>
        </Column>
      </nav>
      <Style
        scopeSelector=".nav__link:hover"
        rules= {styles.hoverLink}
      />
      <Style
        scopeSelector="nav div:nth-child(2)"
        rules= {styles.flexCenter}
      />
    </header>
  )
}

export default Radium()(Header);