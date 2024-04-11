import React, { Component } from 'react';
import Bottum from './bottum.js';

class Heed extends Component {
  render() {
    return (
      <div className='row' style={{
        color: 'white',
        backgroundImage: "url('https://deepsoulfullove.com/wp-content/uploads/2020/02/How-To-Let-Go-of-a-Past-Relationship-and-Move-On.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: '70vh'
      }}>
        <div className="col-4 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-center">katie reed</h1>
          <h3 className="text-center">web developer & designer</h3>
          <Bottum buttonText="contact Me" buttonLink="https://www.lipsum.com/" />
        </div>
      </div>
    );
  }
}

export default Heed;
