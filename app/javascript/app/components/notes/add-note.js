import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { addNoteFromApi } from '../../actions/notes';

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
    const { searchText } = this.props;
    console.log('icon note clicked');
    this.props.dispatch(addNoteFromApi(searchText ? searchText : 'empty note...'));
  }

  render() {
    return(
      <div id="add-note" style={styles.base}>
        <Icon type="plus" title="Add a new note" handleClick={this.handleClickIcon}/>
      </div>
    )
  }
}

const AddNoteRadium = Radium()(AddNote);

const mapStateToProps = (state) => ({ searchText: state.notes.searchText });

export default connect(mapStateToProps)(AddNoteRadium);