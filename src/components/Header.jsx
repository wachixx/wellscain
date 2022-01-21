import React from 'react';
import logo from '../assets/logo-grey.png';

const Header = () => {
    return (
      <header>
      <a
        href="https://athenian.co"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={logo} alt="athenian-logo"/>
      </a>
      <h1>Athenian WebApp Tech Assessment</h1>
    </header>
    )
}

export default Header;