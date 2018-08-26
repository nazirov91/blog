import React from 'react'
import Link from 'gatsby-link'

import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'

/*
<figure className="image">
  <img src={logo} alt="blog.sardor.io" style={{ width: '88px' }} />
</figure>
*/

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          blog.sardor.io
        </Link>
      </div>
      <div className="navbar-start">
        <Link className="navbar-item" to="/">
          Blog
        </Link>
        <Link className="navbar-item" to="/about">
          About
        </Link>
      </div>
      <div className="navbar-end">
        <a
          className="navbar-item"
          href="https://github.com/nazirov91/blog"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">
            <img src={github} alt="Github" />
          </span>
        </a>
      </div>
    </div>
  </nav>
)

export default Navbar
