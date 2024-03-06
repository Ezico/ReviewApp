import React from "react";
import AmazonHeader from "./AmazonHeader";
import AmazonFooter from "./AmazonFooter";

const Withdraw = ({ user }) => {
  return (
    <>
      <AmazonHeader user={user} />
      <div class="page-centered">
        <h2 class="payment">Make a Withdrawal</h2>
        <br />

        <br />
        <p style={{ color: "white", textAlign: "center" }}>
          Your Account balance automatically updates in less than 3 mins after
          making payment
        </p>
      </div>
      <AmazonFooter />
    </>
  );
};

export default Withdraw;
