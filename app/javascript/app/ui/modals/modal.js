import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../../index';

import Icon from '../icons/icon';

export default class Modal extends Component {
  _render = () => {
    ReactDOM.render(
      <Provider store={store}>
        <div className="modal-container">
          <div className="modal-box">
            {this.props.children}
          </div>
          <Icon
            className="modal-close"
            type="times"
            title="Close"
            handleClick={this._unMount}
          />
        </div>
      </Provider>,
      this.modalTarget);
  }

  _unMount = (e) => {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  componentDidMount() {
    if (this.props.open) {
      this.modalTarget = document.createElement('div');
      this.modalTarget.className = "modal";
      document.body.appendChild(this.modalTarget);
      this._render();
      document.getElementsByClassName('modal-box')[0].addEventListener('click', (e) => {
        console.log('clicked inside a modal');
        e.stopPropagation();
      });
      document.getElementsByClassName('modal')[0].addEventListener('click', () => {
        if (this.modalTarget) {
          this._unMount();
        }
      });
    }
  }

  componentDidUpdate() {
    if (!this.props.open) {
      ReactDOM.unmountComponentAtNode(this.modalTarget);
      document.body.removeChild(this.modalTarget);
    } else {
      this.modalTarget = document.createElement('div');
      this.modalTarget.className = "modal";
      document.body.appendChild(this.modalTarget);
      this._render();
      document.getElementsByClassName('modal-box')[0].addEventListener('click', (e) => {
        console.log('clicked inside a modal');
        e.stopPropagation();
      });
      document.getElementsByClassName('modal')[0].addEventListener('click', () => {
        if (this.modalTarget) {
          this._unMount();
        }
      });
    }
  }

  render() {
    return (
      <noscript />
    )
  }
}