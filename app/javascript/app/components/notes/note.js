import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

const styles = {
  base: {
    width: '100%',
    padding: '0 10px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Open Sans',
    color: '#2C82C9',
    fontSize: '13px',
    cursor: 'pointer',
    boxShadow: '0 0 1px rgba(0,0,0,0.2)',
    height: '40px',
    transition: 'all 0.2s ease-in-out',
    ':hover': {
      backgroundColor: '#2CC990',
      color: '#fff'
    }
  },
  selected: {
    backgroundColor: '#2CC990',
    color: '#fff'
  }
}

const Note = ({id, text, handleSelectNote, selected}) => {
  return (
    <div onClick={() => {handleSelectNote(id)}} style={[styles.base, selected && styles.selected]}>
      <span>
        {
          text.length > 30 ? (`${text.toLowerCase().substr(0, 30)}...`) : text
        }
      </span>
    </div>
  )
}

export default Radium(Note);