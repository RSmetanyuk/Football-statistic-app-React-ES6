import React from 'react';
import {render} from 'react-dom';
import {NavBar} from './NavBar';
import {Router, Route} from 'react-router';
import {Championships} from './Championships';
import {Teams} from './Teams';
import {Matches} from './Matches';
import {About} from './About';

class App extends React.Component {
  render () {
    return (
      <div>
        <NavBar />
        <div className="container" id="main-content">
          <Championships />
        </div>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));