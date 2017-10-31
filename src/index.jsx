import React from 'react';
import { render } from 'react-dom';
import { NavBar } from './NavBar.jsx';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Championships } from './Championships.jsx';
import { Teams } from './Teams.jsx';
import { Matches } from './Matches.jsx';
import { About } from './About.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <NavBar />
        <div className="container" id="main-content">
          <Router>
            <div>
              <ul>
                <li><Link to="/Championships">Championships</Link></li>
                <li><Link to="/Teams">Teams</Link></li>
                <li><Link to="/Matches">Matches</Link></li>
                <li><Link to="/About">About</Link></li>
              </ul>

              <hr/>

              <Route path="/Championships" component={Championships}/>
              <Route path="/Teams" component={Teams}/>
              <Route path="/Matches" component={Matches}/>
              <Route path="/About" component={About}/>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));