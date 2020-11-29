import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Invoice from './Invoice';


const ShowInvoice = (props) => {

    let { _id,
        invoice_number,
        transac_type,
        transac_items,
        transac_status,
        transac_operator,
        transac_customer,
        transac_vehicle,
        sale_transac,
        transac_subtotal,
        transac_discount,
        transac_taxes,
        transac_total,
        amount_received,
        transac_message,
        transac_date } = props.location.state.trans
    return (
        <div>
            <Invoice
                id={_id}
                invoice_number={invoice_number}
                transac_type={transac_type}
                transac_items={transac_items}
                transac_status={transac_status}
                transac_operator={transac_operator}
                transac_customer={transac_customer}
                transac_vehicle={transac_vehicle}
                sale_transac={sale_transac}
                transac_subtotal={transac_subtotal}
                transac_discount={transac_discount}
                transac_taxes={transac_taxes}
                transac_total={transac_total}
                amount_received={amount_received}
                transac_message={transac_message}
                transac_date={transac_date}
            />
        </div>
    )
}

export default withRouter(ShowInvoice)