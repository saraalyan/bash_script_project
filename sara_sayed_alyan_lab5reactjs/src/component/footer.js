import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'; 

import Bottum from './bottum.js';

class Footer extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row' style={{ background: 'black', color: 'white', padding: '2rem 0' }}>
          <div className="col-4">
            <FontAwesomeIcon icon={faEnvelope} size="lg" /> {/* Changed size to "lg" */}
            <p style={{ color: 'white' }}>alyansara817@gmail.com</p>
            <FontAwesomeIcon icon={faPhone} size="lg" /> {/* Changed size to "lg" */}
            <p style={{ color: 'white' }}>+20 01025159322</p>
          </div>
          <div className="col-4">
            <Bottum buttonText="Download Me" buttonLink="https://www.lipsum.com/" />
          </div>
          <div className="col-4">
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{color:"white"}} href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebook} size="lg" /></a></li> {/* Changed size to "lg" */}
              <li style={{ display: 'inline-block', marginRight: '10px'}}><a style={{color:"white"}} href="https://twitter.com"><FontAwesomeIcon icon={faTwitter} size="lg" /></a></li> {/* Changed size to "lg" */}
              <li style={{ display: 'inline-block', marginRight: '10px' }}><a style={{color:"white"}}href="https://www.linkedin.com"><FontAwesomeIcon icon={faLinkedin} size="lg" /></a></li> {/* Changed size to "lg" */}
              <li style={{ display: 'inline-block', marginRight: '10px'}}><a style={{color:"white"}}href="https://github.com"><FontAwesomeIcon icon={faGithub} size="lg" /></a></li> {/* Changed size to "lg" */}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
