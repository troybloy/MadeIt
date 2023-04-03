import React from "react";
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-header">Connect with the Developer</div>
        <div className="dev-links">
          <a href='https://github.com/troybloy' title="Troy's GitHub" target="_blank">
            <i className='troy-GitHub fa-brands fa-github'></i>
          </a>
          <a href='https://www.linkedin.com/in/troy-lee-1603ba159/' title="Troy's LinkedIn" target="_blank">
            <i className='troy-LinkedIn fa-brands fa-linkedin'></i>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
