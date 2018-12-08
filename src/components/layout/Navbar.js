import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = (props) => {
  return (
    <div id="appNavbar">
        <div className="navbar-fixed">
          <nav className="nav green darken-1">
             <div className="nav-wrapper container">
                <div className="row">
                   <Link to="/" className="brand-logo">Aspire</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {props.isLoanApproved ? <li> <button className="btn greed darken-2" disabled>Loan Approved</button></li> : null }
                        <li><a href="/"><i className="medium material-icons">card_membership</i></a></li>
                        <li><a href="/"><i className="medium material-icons">account_circle</i></a></li>
                    </ul>
                </div>
              </div>
              {props.progress ? <div className="progress red"><div className="indeterminate"></div></div> : null }
          </nav>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
      ...state
  }
}

export default connect(mapStateToProps)(Navbar);