import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { db } from "../firebase";
import LatestProduct from "../components/LatestProduct";
import NotificationSlider from "../components/NotificationSlider";

const Home = ({ products, user }) => {
  const [data, setData] = useState();
  const [dataLoading, setDataLoading] = useState(false);
  // prod
  const id = "TgcagxHqMIpvRTMnsjU4";

  // dev
  // const id = "tM2sKnh9bSfpyvARBvkj";

  useEffect(() => {
    id && getHomeDataFromDB();
  }, [id]);

  const getHomeDataFromDB = async () => {
    setDataLoading(true);
    const docRef = doc(db, "HomeDetails", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
      setDataLoading(false);
    }
  };
  // push to top page after loading
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header user={user} />
      <NotificationSlider />
      <LatestProduct products={products} />
      <Footer />
    </>
  );
};

export default Home;
