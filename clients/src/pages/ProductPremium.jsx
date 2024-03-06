import React, { useEffect, useState } from "react";
import AmazonHeader from "../components/AmazonHeader";
import NotificationSlider from "../components/NotificationSlider";
import AmazonFooter from "../components/AmazonFooter";
import PremiumProductDetails from "../components/PremiumProductDetails";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

const ProductPremium = ({ user }) => {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const getData = async (e) => {
      let data = [];
      const ProductData = query(
        collection(db, "Products"),
        where("url", "==", id)
      );
      const querySnapshot = await getDocs(ProductData);
      querySnapshot.forEach((doc) => {
        setProduct({ ...doc.data() });
      });
    };
    getData();
  }, []);
  // console.log(product);
  return (
    <div>
      <AmazonHeader user={user} />
      <NotificationSlider />
      <br />
      <br />
      <PremiumProductDetails product={product} user={user} />
      <AmazonFooter />
    </div>
  );
};

export default ProductPremium;
