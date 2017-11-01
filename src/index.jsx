import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom'

import { NavBar } from './NavBar.jsx';
import { Championships } from './Championships.jsx';
import { Teams } from './Teams.jsx';
import { Matches } from './Matches.jsx';
import { About } from './About.jsx';

const App = () => (
  <div>
    <NavBar />
    <div className="container" id="main-content">
      <Switch>
        <Route exact path='/' component={Championships}/>
        <Route path='/Championships' component={Championships}/>
        <Route path='/Teams' component={Teams}/>
        <Route path='/Matches' component={Matches}/>
        <Route path='/About' component={About}/>
      </Switch>
    </div>
  </div>
)

render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('app'))