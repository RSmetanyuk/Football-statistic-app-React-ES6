import React from 'react';
import { Link } from 'react-router-dom'

export class NavBar extends React.Component {
  render() {
    const pages = ['Championships', 'Teams', 'Matches', 'About'];
    const navLinks = pages.map(page => {
      return (
        <li key={page}>
          <Link to={'/' + page.toLowerCase()}>
            {page}
          </Link>
        </li>
      )
    });

    return (
      <div className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <Link to="/championships"><img src="img/football.png" alt="Soccer ball"></img></Link>
          <ul className="nav navbar-nav">            
            <nav>{navLinks}</nav>
          </ul>
        </div>
      </div>
    );
  }
}