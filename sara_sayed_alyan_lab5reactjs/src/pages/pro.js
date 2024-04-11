import React, { Component } from 'react';
import AboutMe from '../component/AboutMe';
import Skills from '../component/Skills';
import Portfolio from '../component/Portfolio';
import Footer from '../component/footer';
import Heed from '../component/heed';

class Pro extends Component {
  render() {
    return (
    
      <div className="container">
    <Heed/>
        <div className="row">
          <div className="col-3">
            <div className="container" style={{ justifyContent: 'center',padding:'4rem' }}>
              <h1>About Me</h1>
            </div>
          </div>
          <AboutMe />
        </div>

        <Skills />

        <Portfolio />
        <Footer/>
        
      </div>
    );
  }
}

export default Pro;
