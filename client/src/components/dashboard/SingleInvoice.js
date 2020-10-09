import React, {useEffect} from 'react'
import Invoice from '../checkout/Invoice'
import { withRouter} from "react-router-dom";
import { connect} from "react-redux"
import { getTrans } from "../../actions/transActions";
import { Button } from "reactstrap";
const SingleInvoice = (props) => {

    useEffect(() => {
        props.getTrans()
        // eslint-disable-next-line
    }, [])

    // console.log(props.transactions)
    console.log(props.invoice)
    const transac = props.invoice? props.invoice: null
    return props.isAuthenticated && props.invoice? (
        <div>
            <Invoice
                invoiceNumber={transac.invoice_number}
                user={transac.customer}
                books={transac.items}
                subtotal={transac.subtotal}
                taxes={transac.taxes}
                total={transac.total}
                amount_received={transac.amount_received}
                sale={transac.sale}
                discount={transac.discount}
            /> 
        </div>
    ): (
        
        <div>
        {props.history.push('/dashboard')}
        <span>Please select an invoice from dashboard</span>
        <br/>
        <Button onClick={() => props.history.push('/dashboard')} variant="outline-light">Go to dashboard</Button>
        </div>
    )
}

const mapStateToProps = state => ({
    invoice: state.checkout.invoice,
    transactions: state.trans,
    isAuthenticated: state.auth.isAuthenticated
  });
  
  export default connect(
    mapStateToProps,
    { getTrans }
  )(withRouter(SingleInvoice));
  