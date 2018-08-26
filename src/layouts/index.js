import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import './all.sass'
require("prismjs/themes/prism.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="blog.sardor.io" />
    <Navbar />
    <div>{children()}</div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
