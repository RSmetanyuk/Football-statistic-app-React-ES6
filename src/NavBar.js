import React from 'react';

export class NavBar extends React.Component {
  render() {
    const pages = ['Championships', 'Teams', 'Matches', 'About'];
    const navLinks = pages.map(page => {
      return (
        <li key={page}>
          <a href={'#/' + page}>
            {page}
          </a>
        </li>
      )
    });

    return (
      <div className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <a href="#"><img src="img/football.png" alt="Soccer ball"></img></a>
          <ul className="nav navbar-nav">            
            <nav>{navLinks}</nav>
          </ul>
        </div>
      </div>
    );
  }
}

