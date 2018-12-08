import React from 'react'
import LoanApplication from '../main/LoanApplication';
import Home from './Home';
import { Route, Switch } from 'react-router-dom';
import RepaySchedule from '../main/RepaySchedule';


export default function Routes() {
  return (
    <div className="row">
        <div className="col s12">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/applyloan" component={LoanApplication} />
                <Route path="/repayschedule" component={RepaySchedule} />
            </Switch>
        </div>
    </div>
  )
}
