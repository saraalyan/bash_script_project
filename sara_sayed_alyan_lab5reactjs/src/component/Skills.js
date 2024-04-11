import React, { Component } from 'react';
import SubProgressBar from './SubProgressBar.js';

class Skills extends Component {
  render() {
    return (
      <div className="container" style={{ justifyContent: 'center', background: 'gray', color: 'white' }}>
        <div className="row justify-content-center">
          <h1>Skills</h1>
        </div>
        <div className="row">
          <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."</p>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="container" style={{ justifyContent: 'center' }}>
              <p>Lorem Ipsum</p>
              <p>Lorem Ipsum</p>
              <p>Lorem Ipsum</p>
              <p>Lorem Ipsum</p>
            </div>
          </div>
          <div className="col-9">
            <SubProgressBar subject="Math" percentage={50} />
            <SubProgressBar subject="HTML" percentage={30} />
            <SubProgressBar subject="CSS" percentage={50} />
            <SubProgressBar subject="Bootstrap" percentage={50} />
            <SubProgressBar subject="Science" percentage={75} />
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
