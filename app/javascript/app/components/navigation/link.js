import React, { Component } from 'react';
import Radium, { Style } from 'radium';
import { NavLink } from 'react-router-dom';

const styles = {
  base: {
    color: '#27D0B9',
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
    color: '#EB524A',
    borderBottomColor: '#EB524A'
  },
  right: {
    alignSelf: 'flex-end'
  }
}

class Link extends Component {
  render() {
    const { path, exact, isActive, right, left, noStyles } = this.props;
    let stylesObject = { ...styles.base };
    stylesObject = right ?  { ...stylesObject, ...styles.right } : stylesObject;
    stylesObject = left ? { ...stylesObject, ...styles.left } : stylesObject;
    stylesObject = noStyles ? {} : stylesObject;
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