import React from 'react';
import {render} from 'react-dom';
import {NavBar} from './NavBar';

class App extends React.Component {
  render () {
    return (
      <div>
        <NavBar />
        <div className="container" id="main-content">
        </div>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));