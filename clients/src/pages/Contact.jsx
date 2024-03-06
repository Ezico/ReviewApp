import React, { useEffect, useState, useRef } from "react";
import Footer from "../components/Footer";
import Email from "../assets/images/email.png";
import Default from "../assets/images/default.png";
import Waiting from "../assets/images/waiting.png";
import Sent from "../assets/images/sent.png";
import emailjs from "@emailjs/browser";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import AmazonHeader from "../components/AmazonHeader";
import AmazonFooter from "../components/AmazonFooter";

const initialState = {
  email: "",
  username: "",
  subject: "",
  message: "",
};
const Contact = ({ metaData }) => {
  const [data, setData] = useState();
  const [form, setForm] = useState(initialState);
  const [active, setActive] = useState(null);
  const [passed, setPassed] = useState(false);
  const [openModal, setOpenModel] = useState(false);

  //  prod
  const id = "Cw1TrtdA382NCnAzNcIu";

  // dev
  // const id = "vpmEfY5KkO2YzMEgTSXB";

  const onChange = () => {
    console.log("passed");
    setPassed(true);
  };

  useEffect(() => {
    id && getHomeDataFromDB();
    setActive("Contact");
  }, [id]);

  const { email, message, subject, username } = form;
  const getHomeDataFromDB = async () => {
    const docRef = doc(db, "AboutDetails", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    var nameVal = document.forms["contact"]["username"].value;
    var emailVal = document.forms["contact"]["email"].value;
    var subjectVal = document.forms["contact"]["subject"].value;
    var messageVal = document.forms["contact"]["message"].value;

    if (emailVal == null || emailVal == "") {
      document.getElementsByClassName("errorEmail")[0].style.display = "block";
      document.getElementsByClassName("errorEmail")[0].innerHTML =
        "Please enter a valid email Address";
      return false;
    } else {
      document.getElementsByClassName("errorEmail")[0].style.display = "none";
    }

    if (nameVal == null || nameVal == "") {
      document.getElementsByClassName("errorName")[0].style.display = "block";
      document.getElementsByClassName("errorName")[0].innerHTML =
        "Please add your Full Name";
      return false;
    } else {
      document.getElementsByClassName("errorName")[0].style.display = "none";
    }
    if (subjectVal == null || subjectVal == "") {
      document.getElementsByClassName("errorMessage")[0].style.display =
        "block";
      document.getElementsByClassName("errorSubject")[0].innerHTML =
        "Please Fill the subject field";
      return false;
    } else {
      document.getElementsByClassName("errorSubject")[0].style.display = "none";
    }
    if (messageVal == null || messageVal == "") {
      document.getElementsByClassName("errorMessage")[0].style.display =
        "block";
      document.getElementsByClassName("errorMessage")[0].innerHTML =
        "Please type in your message";
      return false;
    } else {
      document.getElementsByClassName("errorMessage")[0].style.display = "none";
    }
    if (!passed) {
      document.getElementsByClassName("errorRecaptcha")[0].innerHTML =
        "Recapcha Not Passed";
      return false;
    } else {
      document.querySelector(".default").style.display = "none";
      document.querySelector(".waiting").style.display = "block";
      document.querySelector(".sent").style.display = "none";
      setTimeout(function () {
        document.querySelector(".default").style.display = "none";
        document.querySelector(".waiting").style.display = "none";
        document.querySelector(".sent").style.display = "block";
      }, 4000);

      emailjs
        .sendForm(
          "service_u82ttiw",
          "template_vuly37i",
          form.current,
          "b4I2DIDCQLNVOeFQC"
        )
        .then(
          (result) => {
            setOpenModel(!openModal);
            e.target.reset();
            document.querySelector(".default").style.display = "block";
            document.querySelector(".waiting").style.display = "none";
            document.querySelector(".sent").style.display = "none";
          },
          (error) => {
            // toast.error("Message Not Sent!");
            e.target.reset();
          }
        );
    }
  };
  // push to top page after loading
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AmazonHeader active={active} />
      <div className="container-fluid pt-90">
        <div className="wrapper">
          <div className="row">
            <div className="col-md-6 "></div>
            <div className="col-md-6 ">
              <div className="form-container">
                <div className="form-content">
                  <form ref={form} onSubmit={sendEmail} name="contact">
                    <input type="hidden" name="form-name" value="contact" />
                    <div className="form">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        onChange={handleChange}
                        value={email}
                      />
                      <p
                        class="errorEmail"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "12px",
                        }}
                      ></p>
                    </div>
                    <div className="form">
                      <label htmlFor="email">Full Name</label>
                      <input
                        type="text"
                        name="username"
                        placeholder="Enter Name"
                        value={username}
                        onChange={handleChange}
                      />
                      <p
                        class="errorName"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "12px",
                        }}
                      ></p>
                    </div>
                    <div className="form">
                      <label htmlFor="Subject">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Enter a subject here"
                        value={subject}
                        onChange={handleChange}
                      />
                      <p
                        class="errorSubject"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "12px",
                        }}
                      ></p>
                    </div>
                    <div className="form">
                      <label htmlFor="message">Message</label>
                      <textarea
                        style={{ resize: "none" }}
                        type="text"
                        name="message"
                        placeholder="Write here.."
                        value={message}
                        onChange={handleChange}
                      ></textarea>
                      <p
                        class="errorMessage"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "12px",
                        }}
                      ></p>
                    </div>
                    <div className="form">
                      <p
                        class="errorRecaptcha"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          paddingLeft: "12px",
                        }}
                      ></p>
                    </div>

                    <button
                      style={{
                        float: "right",
                        background: "transparent",
                        border: "0",
                      }}
                      type="submit"
                    >
                      <img className="default" src={Default} alt="" />
                      <img
                        style={{ display: "none" }}
                        className="waiting"
                        src={Waiting}
                        alt=""
                      />
                      <img
                        style={{ display: "none" }}
                        className="sent"
                        src={Sent}
                        alt=""
                      />
                    </button>
                    <br />
                    <br />
                    <br />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AmazonFooter />
    </>
  );
};

export default Contact;
