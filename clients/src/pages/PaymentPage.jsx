import React from "react";
import AmazonHeader from "../components/AmazonHeader";
import AmazonFooter from "../components/AmazonFooter";

const PaymentPage = ({ user, logout }) => {
  return (
    <div>
      <AmazonHeader user={user} logout={logout} />
      <div className="page-centered">
        <h2 className="payment">Make a Deposit</h2>
        <br />
        <table>
          <tr>
            <td>BANK NAME</td>
            <td>ACCOUNT NO.</td>
            <td>ACCOUNT NAME</td>
          </tr>
          <tr>
            <td>First Bank</td>
            <td>00088757868</td>
            <td>Bing Ent Limited</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>09875456787</td>
            <td>Bing Ent Limited</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>66788943211</td>
            <td>Bing Ent Limited</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>99837537793</td>
            <td>Bing Ent Limited</td>
          </tr>
        </table>
        <br />
        <p style={{ color: "white", textAlign: "center" }}>
          Your Account balance automatically updates in less than 3 mins after
          making payment
        </p>
      </div>
      <AmazonFooter />
    </div>
  );
};

export default PaymentPage;
