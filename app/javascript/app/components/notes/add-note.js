import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

// Components
import Icon from '../../ui/icons/icon';

const styles = {
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export class AddNote extends Component {

  handleClickIcon = () => {
    console.log('icon note clicked');
  }

  render() {
    return(
      <div style={styles.base}>
        <Icon type="plus" title="Add a new note" handleClick={this.handleClickIcon}/>
      </div>
    )
  }
}

const AddNoteRadium = Radium()(AddNote);
export default connect()(AddNoteRadium);