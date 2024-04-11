import React, { Component } from 'react';
import CardTitle from './cardtitlle.js';

class Portfolio extends Component {
  render() {
    return (
      <div>
        <h1>Portfolio</h1>
        <div className='row'>
          <CardTitle title='Card 1' background='red' />
          <CardTitle title='Card 2' background='blue' />
          <CardTitle title='Card 3' background='green' />
        </div>
        <div className='row'>
          <CardTitle title='Card 4' background='green' />
          <CardTitle title='Card 5' background='blue' />
          <CardTitle title='Card 6' background='green' />
        </div>
      </div>
    );
  }
}

export default Portfolio;
