import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

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
        <Route path='/championships' component={Championships} />
        <Route path='/teams' component={Teams} />
        <Route path='/matches' component={Matches} />
        <Route path='/about' component={About} />
        <Route path='/' render={() => (<Redirect to="/championships" />)} />
      </Switch>
    </div>
  </div>
)

render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('app'))