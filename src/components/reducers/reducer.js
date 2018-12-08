const initState = {
    loan: 1000,
    weeks: 1,
    repayment: 1000,
    interest: 0.02,
    repayWeeks: [],
    isLoanApproved: false,
    totalToBePaidWithInterest: 0,
    toBePaid: 0,
    paid: [],
    progress: false
}

const reducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'UPDATE_REPAYMENT':
            const payloadState = {...state, ...payload};
            const percentage = payloadState.loan + (payloadState.loan * payloadState.interest);
            const repayment = percentage / payloadState.weeks;
            return {
                ...payloadState, repayment
            }
        
        case 'REPAY_SCHEDULE':
            return { ...state, 'repayWeeks': [...payload]}
        
        case 'LOAN_APPROVED':
            return {...state, isLoanApproved: payload}
        case 'UPDATE_PAID_WEEKS':
            const thisState = {...state};
            thisState.paid.push(payload);
            thisState.toBePaid += 1;
            return {...state,...thisState}
        case 'LOADER': 
            return {...state, progress: payload}
        case 'UPDATE_TOTAL':
            const totalToBePaidWithInterest = state.loan + (state.loan * state.interest);
            return {...state,totalToBePaidWithInterest}
        default: 
            return {...state, ...payload}
    }
}

export default reducer