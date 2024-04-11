import React, { Component } from 'react';

class CardTitle extends Component {
  render() {
    const { title, background } = this.props;

    return (
      <div className="col-4">
        <div className="card" style={{ backgroundColor: background, margin: '1rem' }}>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">helllo</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CardTitle;
