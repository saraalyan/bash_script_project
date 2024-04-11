import React, { Component } from 'react';
import Bottum from './bottum.js';

class AboutMe extends Component {
  render() {
    return (
      <div className="col-6"style={{padding:'4rem'}}>
        <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."</p>
        <Bottum buttonText="Download Me" buttonLink="https://www.lipsum.com/" />
      </div>
    );
  }
}

export default AboutMe;
