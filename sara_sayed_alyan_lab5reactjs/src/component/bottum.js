import React, { Component } from 'react';

class Bottum extends Component {
  render() {
    const { buttonText, buttonLink } = this.props;

    return (
      <button style={{ border: '1px solid white',background: "transparent" ,padding:'.75rem',margin:'1rem'}}>
        <a style={{textDecoration:'none',color:'white'}} href={buttonLink}> {buttonText}</a>
      </button>
    );
  }
}

export default Bottum;
