import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import M from 'materialize-css/dist/js/materialize';

class LoanApplication extends Component {

  componentDidMount() {
    this.props.updateRepayment(this.props);
    this.props.totalPayment();
  }

  loanValueChange = (e) => {
    const stateVal = {
      [e.target.id]: parseInt(e.target.value)
    }
    this.props.updateRepayment(stateVal);
    this.props.totalPayment();
  }

  calculateRepayment = () => {
    const { loan, interest, weeks } = this.props;
    const outstandingWithInterest = loan + (loan * interest);
    const repayWeekPayment = [];
    const repayschedule = _.range(weeks).map(week => {
        const weekpayment = outstandingWithInterest / weeks;
        repayWeekPayment[week] = weekpayment * week;
        return {
            week,
            weekpayment,
            outstandingWithInterest,
        }
    }).map((each,idx) => {
        each.outstandingWithInterest = each.outstandingWithInterest - repayWeekPayment[idx];
        each['paid'] = this.props.paid.indexOf(idx) > -1;
        each['toBePaid'] = (this.props.toBePaid === idx)
        return each;
    });
    return repayschedule;
  }

  applyLoan = (e) => {
    e.preventDefault();
    this.props.loader(true);
    setTimeout(() => {
      M.toast({html: 'Congratulations, Your Loan is Approved. Redirecting to payment page.', classes: 'rounded', 'displayLength': 3000});
      this.props.loader(false);
    },2000);
    setTimeout(() => {
      this.props.history.push('/repayschedule');
    },3000)
    this.props.setLoanApproved(true);
    this.props.updateRepaySchedule(this.calculateRepayment());
  }



  interestPerc = () => this.props.interest * 100;

  handleRepaymentClick = () => {
    this.props.updateRepaySchedule(this.calculateRepayment());
    this.props.history.push('/repayschedule');
  }

  render() {
    const { loan, weeks, repayment } = this.props;
    return (
      <div className="row" id="loanApplication">
        
        <div className="col s8">
            <div className="card">
                <div className="card-stacked">
                    <div className="card-content">
                      { !this.props.isLoanApproved ?
                        (<form onSubmit={this.applyLoan}>
                          <div className="row">
                            <div className="col s12">
                              <h6>How much do you need? (S$) <span className="right">{loan}</span></h6>
                              <p className="range-field">
                                  <input type="range" 
                                        id="loan" 
                                        min="1000" 
                                        max="100000" 
                                        value={loan} 
                                        onChange={this.loanValueChange}/>
                              </p>
                            </div>
                            <div className="col s12">
                              <h6>Loan Tenure (weeks) <span className="right">{weeks}</span></h6>
                              <p className="range-field">
                                  <input type="range" 
                                        id="weeks" 
                                        min="1" 
                                        max="100" 
                                        value={weeks} 
                                        onChange={this.loanValueChange}/>
                              </p>
                            </div>
                            <div className="col s12">
                              <button className="btn right" type="submit">Submit<i className="material-icons right"></i></button>
                              
                            </div>
                          </div>
                        </form>)
                        :
                        <p>Dear Customer, your loan has been approved already. Please go to repayment schedule to pay loan weekly.</p>
                      }
                    </div>
                </div>
            </div>
        </div>
        <div className="col s4">
            <div className="card">
              <div className="card-content">
                <label>Overall interest rate(p.w) <span className="right">{this.interestPerc()}%</span></label>

                <hr/>
                <label>Your Weekly repayment including interest</label>
                <h6>S$ {repayment}</h6>
                <label>Total Amount to be paid including interest.</label>
                <h6>S$ {this.props.totalToBePaidWithInterest}</h6>
              </div>
              <div className="card-action">
                <div className="row">
                  <button className="btn green" onClick={this.handleRepaymentClick}>View Repayment Schedule</button>
                </div>
              </div>
            </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateRepayment: (payload) => {
      dispatch({
        type: 'UPDATE_REPAYMENT', payload
      })
    },
    setLoanApproved: (payload) => {
      dispatch({
        type: 'LOAN_APPROVED', payload
      })
    },
    totalPayment: () => {
      dispatch({type: 'UPDATE_TOTAL'})
    },
    updateRepaySchedule: (payload) => {
      dispatch({
          type: 'REPAY_SCHEDULE', payload
      })
    },
    loader: (payload) => {
      dispatch({
        type: 'LOADER', payload
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanApplication);