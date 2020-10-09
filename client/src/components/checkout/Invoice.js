import React from "react";
import { Container } from "reactstrap";

const Invoice = ({ invoiceNumber, user, books, subtotal, taxes, total, sale_price=null, amount_received=null, sale=false, discount=0 }) => {
  console.log(amount_received)
  const PrintPage = () => {
    window.print();
  };
  const invoiceLogo = "https://ibbreformada.org/wp-content/uploads/2019/06/LogoMakr_0R2xJD.png"

  let totalVariable = sale_price? 'Subtotal': 'Grand Total'
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
                Libreria Bíblica Sendas Antiguas
                <br />
                290 Water Street, Lawrence MA 01841
                <br />
                Phone: (978) 681-7570
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
              <p id="customer-title">
                {user.name}
                <br />
                {user.phone}
                <br />
                {user.email}
              </p>

              <table id="meta">
                <tbody>
                  <tr>
                    <td className="meta-head">Invoice #</td>
                    <td>
                      <p>{invoiceNumber}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="meta-head">Date</td>
                    <td>
                      <p id="date">{Date().slice(0, 15)}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="meta-head">Amount Due</td>
                    <td>
                      <div className="due">${total}</div>
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
              {books.map(book => (
                <tbody key={book._id}>
                  <tr className="item-row">
                    <td className="item-name">
                      <div className="delete-wpr">
                        <p>{book.name}</p>
                      </div>
                    </td>
                    <td className="description">
                      <p>{book.name}</p>
                    </td>
                    <td>
                      <p className="cost">${book.price}</p>
                    </td>
                    <td>
                      <p className="qty">{book.quantity}</p>
                    </td>
                    <td>
                      <span className="price">
                        ${(book.price * book.quantity).toFixed(2)}
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
                    <div id="subtotal">${subtotal}</div>
                  </td>
                </tr>
                {discount > 0 &&<tr>
                  <td colSpan="2" className="blank">
                    {" "}
                  </td>
                  <td colSpan="2" className="total-line">
                    Discount
                  </td>
                  <td className="total-value">
                    <div id="subtotal"><del>${discount}</del></div>
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
                    <div id="total">${taxes}</div>
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
                    <div className="due">${total}</div>
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
