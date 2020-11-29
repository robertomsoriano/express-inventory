import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { useSelector } from 'react-redux'
import axios from "axios";

// const Invoice = ({ invoiceNumber, user, books, subtotal, taxes, total, sale_price = null, amount_received = null, sale = false, discount = 0 }) => {
const Invoice = ({ id,
  invoice_number,
  transac_type,
  transac_items,
  transac_status,
  transac_operator,
  transac_vehicle,
  sale_transac,
  transac_customer,
  transac_subtotal,
  transac_discount,
  transac_taxes,
  transac_total,
  amount_received,
  transac_message,
  transac_date }) => {

  const PrintPage = () => {
    window.print();
  };
  const invoiceLogo = "http://www.fivestars.com.my/images/AgentSite/FiveStars/logo.png"

  let totalVariable = sale_transac ? 'Subtotal' : 'Grand Total'

  // vehicle
  const vehicles = useSelector(state => state.vehicles)
  const [car, setCar] = useState(null)

  useEffect(() => {
    axios.get(`/api/vehicles/single/${transac_vehicle}`).then(data => { console.log(data.data); setCar(data.data) })
  }, [])
  return (
    <>
      {/* <Button onClick={() => PrintPage()} variant="outline-light">Print Invoice</Button> */}
      <i className="fas fa-print" onClick={() => PrintPage()}></i>
      <Container>
        <div
          id="divToPrint"
          className="mt4"
          style={{
            // backgroundColor: "#f5f5f5",
            width: "218mm",
            minHeight: "297mm",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <div id="page-wrap">
            <p id="header">INVOICE</p>

            <div id="identity">
              <p id="address">
                Five Stars Express
                <br />
                600 Essex Street, Lawrence MA 01841
                <br />
                Phone: (978) 688-8888
              </p>

              <div id="logo">
                <img
                  id="image"
                  src={invoiceLogo}
                  alt="logo"
                />
              </div>
            </div>

            <div style={{ clear: "both" }} />

            <div id="customer">
              {/* Customer, if external transaction */}
              <p id="customer-title">
                {transac_type === "internal" ? transac_type.toUpperCase() : (
                  <>
                    <br />
                    {transac_customer.name}
                    <br />
                    {transac_customer.phone}
                    <br />
                    {transac_customer.email}
                  </>
                )}
              </p>
              <table id="meta">
                <tbody>
                  <tr>
                    <td className="meta-head">Invoice #</td>
                    <td>
                      <p>{invoice_number}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="meta-head">Date</td>
                    <td>
                      <p id="date">{Date(transac_date).slice(0, 15)}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="meta-head">Amount Due</td>
                    <td>
                      <div className="due">${transac_total}</div>
                    </td>
                  </tr>
                  {amount_received && (<tr>
                    <td className="meta-head">Amount Received</td>
                    <td>
                      <div className="due">${amount_received}</div>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div>
            {car && (
              <>
                <table id="vehicle">
                  <tbody>
                    <tr>
                      <th>Vehicle Name</th>
                      <th>Description</th>
                      <th>Vehicle Plate</th>
                      <th>Vehicle Type</th>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td>{car.vehicle_name}</td>
                      <td>{car.vehicle_desc}</td>
                      <td>{car.vehicle_number}</td>
                      <td>{car.vehicle_type}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
            <table id="items">
              <tbody>
                <tr>
                  <th>Item</th>
                  <th>Description</th>
                  <th>Unit Cost</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </tbody>
              {transac_items.map(item => (
                <tbody key={item._id}>
                  <tr className="item-row">
                    <td className="item-name">
                      <div className="delete-wpr">
                        <p>{item.item_name}</p>
                      </div>
                    </td>
                    <td className="description">
                      <p>{item.item_type}</p>
                    </td>
                    <td>
                      <p className="cost">${item.item_price}</p>
                    </td>
                    <td>
                      <p className="qty">{item.item_quantity}</p>
                    </td>
                    <td>
                      <span className="price">
                        ${(item.item_price * item.item_quantity).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              ))}

              <tbody>
                <tr>
                  <td colSpan="2" className="blank">
                    {" "}
                  </td>
                  <td colSpan="2" className="total-line">
                    Subtotal
                  </td>
                  <td className="total-value">
                    <div id="subtotal">${transac_subtotal}</div>
                  </td>
                </tr>
                {transac_discount > 0 && <tr>
                  <td colSpan="2" className="blank">
                    {" "}
                  </td>
                  <td colSpan="2" className="total-line">
                    Discount
                  </td>
                  <td className="total-value">
                    <div id="subtotal"><del>${transac_discount.toFixed(2)}</del></div>
                  </td>
                </tr>}
                <tr>
                  <td colSpan="2" className="blank">
                    {" "}
                  </td>
                  <td colSpan="2" className="total-line">
                    Sales Tax:
                  </td>
                  <td className="total-value">
                    <div id="total">${transac_taxes}</div>
                  </td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td colSpan="2" className="blank">
                    {" "}
                  </td>
                  <td colSpan="2" className="total-line balance">
                    {totalVariable}
                  </td>
                  <td className="total-value balance">
                    <div className="due">${transac_total}</div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* <div id="terms">
              <h5>Terms</h5>
              <p>
                NET 30 Days. Finance Charge of 1.5% will be made on unpaid
                balances after 30 days.
              </p>
            </div> */}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Invoice;
