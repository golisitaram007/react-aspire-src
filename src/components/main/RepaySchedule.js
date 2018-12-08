import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class RepaySchedule extends Component {

  handleRepayment = (ind) => {
    this.props.loader(true);
    this.props.updatePaidWeeks(ind);
    
    setTimeout(() => {
        const repaySchedule = this.props.repayWeeks.map((each, index) => {
            each['paid'] = this.props.paid.indexOf(index) > -1;
            each['toBePaid'] = (this.props.toBePaid === index)
            return each;
        });
        this.props.updateRepaySchedule(repaySchedule);
        this.props.loader(false);
    }, 1000);
  }
  tablerow = () => {
      return this.props.repayWeeks.map((week, ind) => {
                return (
                    <tr key={ind}>
                        <td>{week.week + 1}</td>
                        <td>{week.outstandingWithInterest}</td>
                        <td>{week.weekpayment}</td>
                        {this.props.isLoanApproved ? 
                            (<td>
                                {!week.paid ? 
                                    (<button className="btn orange" 
                                            onClick={() => this.handleRepayment(ind)}
                                            disabled={!week.toBePaid}
                                    >Repay</button>)
                                    : (<button className="btn orange" disabled={true}>Paid</button>)
                                }
                            </td>) : null}
                    </tr>
                )
        })
    };



  
  render() {
    return (
        <div id="repayschedule">
       
        {  this.props.repayWeeks.length > 0 ?
            (<div className="row">
            {!this.props.isLoanApproved ? <div className="col s12"><Link to="/applyloan"><button className="btn orange">Back</button></Link></div> : null }
            <div className="col s12">
                <table>
                    <thead>
                        <tr>
                            <th>Week</th>
                            <th>Outstanding with interest</th>
                            <th>Weekly Repayment including interest</th>
                            {this.props.isLoanApproved ? <th>Repay</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {this.tablerow()}
                    </tbody>
                </table>
                </div>
            </div>)

            :

            <div className="card">
                <div className="card-content">
                    Hello, Guest. Currently you don't have any loans to repay. Please go through link to apply new loan.
                    <p><Link to="/applyloan" >Apply Loan</Link></p>
                    
                </div>
            </div>
        }
        
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
        updatePaidWeeks: (payload) => {
            dispatch({
                type: 'UPDATE_PAID_WEEKS', payload
            })
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
export default connect(mapStateToProps, mapDispatchToProps)(RepaySchedule);