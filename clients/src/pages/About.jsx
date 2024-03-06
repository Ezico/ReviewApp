import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Ico from "../assets/images/icos.png";
import { db } from "../firebase";
import Modal from "../components/Modal";
import AmazonHeader from "../components/AmazonHeader";
import AmazonFooter from "../components/AmazonFooter";

const About = ({ metaData }) => {
  const [openModal, setOpenModel] = useState(false);
  const [data, setData] = useState();

  // prod
  const id = "Cw1TrtdA382NCnAzNcIu";

  // dev
  // const id = "vpmEfY5KkO2YzMEgTSXB";

  const [screen, setScreen] = useState();
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(null);
  // push to top page after loading
  useEffect(() => {
    setActive("About");
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (window.screen.availWidth < 760) {
      setScreen("Mobile");
    } else {
      setScreen("DesKtop");
    }
  });

  useEffect(() => {
    id && getAboutDataFromDB();
    setTimeout(function () {
      const hiddenElements = document.querySelector(".structure");
      hiddenElements.style.opacity = "1";
      console.log(hiddenElements);
    }, 4000);
  }, [id]);

  const getAboutDataFromDB = async () => {
    setLoading(true);
    const docRef = doc(db, "AboutDetails", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
    setLoading(false);
  };

  console.log(data);
  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModel(false)} />
      <AmazonHeader active={active} />
      <div
        className="heroA"
        style={{
          backgroundImage: `url(${
            screen == "Mobile" ? data?.heroBannerMobile : data?.bannerImg
          })`,
          backgroundPosition: "center",
        }}
      >
        {/* <img className="hero-img" src={Banner} alt="" /> */}
        <div className="wrapper">
          <div className="row">
            <div className="pd-intro col-md-6 col-sm-12 wrapper hidden">
              <div className="hero-content">
                <h2 className="abt-text ">
                  <div dangerouslySetInnerHTML={{ __html: data?.title1 }} />
                </h2>
                <br />
              </div>
              <div
                className="text-content "
                dangerouslySetInnerHTML={{
                  __html: data?.subtitle1,
                }}
              />

              <button
                style={{ width: "150px", opacity: "0" }}
                onClick={() => setOpenModel(!openModal)}
                className="structure primary btn large"
              >
                Listen
              </button>
            </div>
            <div className="col-md-6 col-sm-12"></div>
          </div>
          <br />
        </div>
        <img className="ico-img" src={Ico} alt="" />
      </div>
      <AmazonFooter />
    </>
  );
};

export default About;
