import React from "react";
import AmazonHeader from "../components/AmazonHeader";
import LatestProduct from "../components/LatestProduct";
import AmazonFooter from "../components/AmazonFooter";
import NotificationSlider from "../components/NotificationSlider";

const Amazon = ({ user, products, handleLogout }) => {
  return (
    <div>
      <AmazonHeader user={user} handleLogout={handleLogout} />
      <NotificationSlider />
      <br />
      <br />
      <LatestProduct products={products} />
      <AmazonFooter />
    </div>
  );
};

export default Amazon;
