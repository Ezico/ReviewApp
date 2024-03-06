import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
const initialState = {
  username: "",
  title: "",
  body: "",
};
const Modal = ({ user, open, onClose, product }) => {
  const [form, setForm] = useState(initialState);
  const [score, setScore] = useState(0);
  const email = user?.email;

  const userId = user?.id;
  const balance = user?.balance;
  const updatedBal = user?.balance + product?.reviewPrice;

  const navigate = useNavigate();
  const handleScoreChage = function (e) {
    setScore(e.target.value);
    setForm({ ...form, score: score });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const options = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 6000,
    onClose: (props) => {
      window.location.reload();
    },
  };
  const addcredit = async (e) => {
    try {
      await updateDoc(doc(db, "Users", userId), {
        balance: updatedBal,
      });
      toast.success(
        "YOU GOT " +
          `+₦${product?.reviewPrice} added to your balance,all available for withdrowal from your dashboard`,
        options
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.info(
        "Only logged in users can add reviews please signup or login"
      );
    }
    if (email && form.title && form.body && form.score && form.username) {
      try {
        await addDoc(collection(db, "Reviews"), {
          ...form,
          product: product?.url,
          userId: user.userId,
          date: serverTimestamp(),
        });
        addcredit();
      } catch (err) {
        toast.error("Not Added" + err);
      }
    } else {
      toast.error("Please Fill in all the form");
    }
  };
  // console.log(productId);
  if (!open) return null;
  return (
    <div className="modal" tabIndex={-1} id="kt_modal_1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <button onClick={onClose} className="close-modal">
              X
            </button>
            <h2 className="text-light">Write a review</h2>
            <p className="text-light">
              get rewards for writing reviews, start now.
            </p>
            <br />
            <div className="row pop">
              <form onSubmit={handleSubmit} className="review">
                <label htmlFor="username">Enter Your Name</label>
                <input
                  placeholder="Enter Full Name"
                  onChange={handleChange}
                  type="text"
                  id="username"
                  name="username"
                  // value={userName}
                />
                <label htmlFor="email">Enter Your Email</label>
                <input
                  placeholder="Email Address"
                  // onChange={handleEmailChange}
                  type="email"
                  name="email"
                  id="email"
                  disabled
                  value={email}
                />
                <label htmlFor="score">What's your score</label>
                <h3
                  className={score > 3 ? "pro_Score high-score" : "pro_Score"}
                >
                  {score}
                </h3>
                <div className="slidecontainer">
                  <input
                    placeholder="0"
                    type="range"
                    name="score"
                    id="score"
                    className="sliderx"
                    onChange={handleScoreChage}
                    min="0"
                    max="5"
                    step="1"
                  />
                </div>

                <label htmlFor="body">Review Message</label>
                <input type="text" name="title" onChange={handleChange} />
                <textarea
                  onChange={handleChange}
                  name="body"
                  id="body"
                  cols="30"
                  rows="10"
                  placeholder="Review Message (Min 100 characters)"
                ></textarea>
                <button
                  type="submit"
                  id="kt_sign_in_submit"
                  className="btn btn-dark"
                >
                  CREATE
                </button>
              </form>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
