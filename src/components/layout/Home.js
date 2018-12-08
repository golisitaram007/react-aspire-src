import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <div className="col s12">
        <h4 className="header">Hello, Guest</h4>
        <div className="card horizontal">
          <div className="card-stacked">
            <div className="card-content">
                <p>Welcome to Aspire, we can help you to apply loan. Please click on below link.</p>
            </div>
            <div className="card-action">
                <Link to="/applyloan" >Apply Loan</Link>
            </div>
           </div>
        </div>
      </div>
    </div>
  )
}
