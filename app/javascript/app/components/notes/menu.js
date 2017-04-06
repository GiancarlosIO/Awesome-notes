import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

// Components
import Icon from '../../ui/icons/icon';

const styles = {
  base: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  userEmail: {
    color: '#3498db',
    fontSize: '16px',
    fontWeight: '300',
    fontFamily: 'open sans',
    marginLeft: 'auto'
  }
}

export class Menu extends Component {
  render() {
    const { email } = this.props;
    return (
      <div style={styles.base}>
        <Icon type="info-circle" title="Show information of note selected"/>
        <Icon type="trash-o" title="" />
        <span style={styles.userEmail}>{email}</span>
      </div>
    )
  }
}

const MenuRadium = Radium()(Menu);

const mapStateToProps = (state) => ({email: state.auth.user.email});
export default connect(mapStateToProps)(MenuRadium);
