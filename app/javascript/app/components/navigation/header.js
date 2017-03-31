import React from 'react';
import Radium, { Style } from 'radium';
import { connect } from 'react-redux';
import LinkHeader from './link-header';
import Column from '../../grid/column';
import signin from '../authentication/signin';
import signup from '../authentication/signup';
import notes from '../notes/index';
import { signoutUser } from '../../actions/';

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
  },
  otherLink: {
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(0,0,0,0.5)'
  }
}

export const Header = ({authenticated, dispatch}) => {

  const signout = () => {
    console.log('sign out user');
    //dispatch(signoutUser())
  }

  const renderLinks = () => {
    if (authenticated) {
      return [
          <LinkHeader path="/notes" key="1">
            My Notes
          </LinkHeader>,
          <span style={styles.otherLink} key="2" onClick={signout}>
            Sign out
          </span>
      ]
    } else {
      return [
        <LinkHeader path="/signup" key="1">
            Sign up
          </LinkHeader>,
          <LinkHeader path="/signin" key="2">
            Sign in
          </LinkHeader>
      ]
    }
  }
  return (
    <header>
      <nav style={styles.base}>
        <Column width={6}>
          <LinkHeader path="/" exact noStyles>
            <div className="logo" style={styles.logo}></div>
          </LinkHeader>
        </Column>
        <Column width={4} style={styles.flexEnd}>
          <LinkHeader path="/" key="1">
            Home
          </LinkHeader>
         { renderLinks() }
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

const HeaderRadium = Radium()(Header);

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(HeaderRadium)