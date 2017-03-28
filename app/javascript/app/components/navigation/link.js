import React, { Component } from 'react';
import Radium, { Style } from 'radium';
import { NavLink } from 'react-router-dom';

const styles = {
  base: {
    color: '#66CC99',
    fontSize: '16x',
    textDecoration: 'none',
    display: 'block',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent',
    padding: '10px 0',
    margin: '0 15px',
    transition: 'all 0.2s ease'
  },
  active: {
    color: '#27AE60',
    fontWeight: 'bold',
    borderBottomColor: '#27AE60'
  },
  right: {
    alignSelf: 'flex-end'
  }
}

class Link extends Component {
  render() {
    const { path, exact, isActive, right, left } = this.props;
    let stylesObject = { ...styles.base };
    stylesObject = right ?  { ...stylesObject, ...styles.right } : stylesObject;
    stylesObject = left ? { ...stylesObject, ...styles.left } : stylesObject;
    return (
        <NavLink
          to={path}
          exact
          style={stylesObject}
          activeStyle={styles.active}
          isActive={isActive}
          className="nav__link"
        >
          { this.props.children }
        </NavLink>
    )
  }
}

export default Radium()(Link);