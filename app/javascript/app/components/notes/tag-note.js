import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import _ from 'lodash';

import Column from '../../grid/column';
import Container from '../../grid/container';

const styles = {
  select: {
    background: "#fff",
    width: "100%",
    padding: "5px 10px",
    fontSize: "14px",
    outline: 'none'
  },
  input: {
    padding: "5px 10px",
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '1px solid #7f8c8d',
    letterSpacing: '0.5px',
    outline: 'none',
    fontSize: '14px',
    transition: 'all 0.3s ease-in-out',
    width: '100%',
    color: '#e74c3c',
    ':hover': {
      borderBottom: '1px solid #3498db'
    }
  },
  borderLeft: {
    borderLeft: '1px solid rgba(0,0,0,0.15)',
  },
  borderRight: {
    padding: '10px',
    borderRight: '1px solid rgba(0,0,0,0.15)'
  },
  borderLeftRight: {
    padding: '10px',
    borderLeft: '1px solid rgba(0,0,0,0.15)',
    borderRight: '1px solid rgba(0,0,0,0.15)'
  },
  borderBottom: {
    padding: '10px',
    borderBottom: '1px solid rgba(0,0,0,0.15)'
  },
  noWrap: {
    flexFlow: 'row'
  }
}

class TagNote extends Component {

  state = {
    text: ''
  }

  renderOptionsTags = () => {
    const { tags } = this.props;
    if (tags) {
      const tagsOptions = tags.map((tag, index) => (<option value={tag} key={index}>{tag}</option>));
      return tagsOptions;
    } else {
      return <option></option>
    }
  }

  handleChangeInput = (e) => {
    const text = e.target.value;
    const { noteSelected: note } = this.props;
    this.setState({text},() => {
      console.log('handle change input', text);
      if (note) {
        this.updateTag(this.state.text, note.id)
      };
    });
  }

  updateTag = _.debounce((noteId, text) => {
    console.log('creating or updating tag', `noteId:${noteId}, text:${text}`);
  }, 400);

  handleChangeSelect = (e) => {
    const selectedValue = e.target.options[e.target.options.selectedIndex].value;
    console.log('handle change select', selectedValue);
  }

  render() {
    const { noteSelected } = this.props;
    return (
      <Container noPadding extraStyles={styles.noWrap}>
        <Column width="2" minWidth="250px" extraStyles={{...styles.borderLeftRight, ...styles.borderBottom}}>
          <select style={styles.select} onChange={this.handleChangeSelect}>
            <option value="">Search by tag</option>
            { this.renderOptionsTags() }
          </select>
        </Column>
        <Column width="8" minWidth="900px" extraStyles={{...styles.borderRight, ...styles.borderBottom}}>
          {
            noteSelected ?
            <input style={styles.input} type="text" onChange={this.handleChangeInput} value={this.state.text} />
            : null
          }
        </Column>
      </Container>
    )
  }
}

const TagNoteRadium = Radium(TagNote);

const mapStateToProps = (state) => ({
  tags: state.notes.tags,
  noteSelected: state.notes.noteSelected
});

export default connect(mapStateToProps)(TagNoteRadium);