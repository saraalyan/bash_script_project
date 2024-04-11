import React, { Component } from 'react';

class SubProgressBar extends Component {
  render() {
    const { percentage, subject } = this.props;

    return (
      
      <div className="row align-items-center">
        <div className="col-1"style={{ background:'gray',margin:'.5rem'}}>
          <span className="progress-label">{subject}</span>
        </div>
        <div className="col-10">
          <div className="progress">
            <div
              className="progress-bar"style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    );
  }
}



export default SubProgressBar;

