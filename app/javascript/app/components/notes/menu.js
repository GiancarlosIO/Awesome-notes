import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { deleteNoteFromApi } from '../../actions/notes';

// Components
import Icon from '../../ui/icons/icon';
import Modal from '../../ui/modals/modal';

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
  },
  normalText: {
    fontFamily: 'open sans',
    fontSize: '16px',
    color: '#000'
  }
}

export class Menu extends Component {
  constructor() {
    super();
    this.state = {
      openModal: false
    }
  }

  handleDelete = () => {
    const { noteSelected } = this.props;
    if (noteSelected) {
      this.props.dispatch(deleteNoteFromApi(noteSelected.id));
    }
  }

  showNoteInfo = () => {
    const { noteSelected } = this.props;
    if (noteSelected) {
      return (
        <Modal open={this.state.openModal}>
          <h1 style={styles.userEmail}>Details</h1>
          <p style={styles.userEmail}>id: <span style={styles.normalText}>{noteSelected.id}</span></p>
          <p style={styles.userEmail}>text: <span style={styles.normalText}>{noteSelected.text}</span></p>
          <p style={styles.userEmail}>Created at: <span style={styles.normalText}>{noteSelected.created_at}</span></p>
          <p style={styles.userEmail}>Updated at: <span style={styles.normalText}>{noteSelected.updated_at}</span></p>
        </Modal>
      )
    }
  }

  render() {
    const { email, notesCount, noteSelected } = this.props;
    return notesCount > 0 ?
      (
        <div style={styles.base}>
          <Icon
            type="info-circle"
            title="Show information of note selected"
            handleClick={() => { this.setState({openModal: true}) }}
          />
          <Icon
            type="trash-o"
            title="Delete note"
            handleClick={this.handleDelete}
          />
          <span style={styles.userEmail}>{email}</span>
          { this.showNoteInfo() }
        </div>
      ) :
      null
  }
}

const MenuRadium = Radium()(Menu);

const mapStateToProps = (state) => ({
  email: state.auth.user.email,
  noteSelected: state.notes.noteSelected,
  notesCount: Object.keys(state.notes.all)
});
export default connect(mapStateToProps)(MenuRadium);
