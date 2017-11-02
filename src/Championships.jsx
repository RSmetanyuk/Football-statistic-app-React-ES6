import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { ChampionshipsAll } from './ChampionshipsAll.jsx';
import { Championship } from './Championship.jsx';


export const Championships = () => (
    <Switch>
      <Route exact path='/championships' component={ChampionshipsAll}/>
      <Route path='/championships/:name' component={Championship}/>
    </Switch>
)