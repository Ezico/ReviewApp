import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import Stars from "./Stars";
import PremiumProductModal from "./PremiumProductModal";
import Modal from "./Modal";

const PremiumProductDetails = ({ product, user }) => {
  const [openModal, setOpenModel] = useState(false);
  const [openeReview, setOpeneReview] = useState();
  const [reviews, setReviews] = useState([]);
  const [canbuy, setCanbuy] = useState([false]);
  const { id } = useParams();

  const handleButtonClick = async () => {
    let orderd = [];
    const ProductData = query(
      collection(db, "Orders"),
      where("productId", "==", id),
      where("userId", "==", user.id)
    );
    const querySnapshot = await getDocs(ProductData);
    querySnapshot.forEach((doc) => {
      orderd.push({ ...doc.data() });
    });
    if (orderd.length > 0) {
      setCanbuy(true);
      setOpeneReview(true);
    } else {
      setOpenModel(!openModal);
      setCanbuy(false);
    }
  };

  useEffect(() => {
    const getReviews = async (e) => {
      let topList = [];
      const Reviews = query(
        collection(db, "Reviews"),
        where("product", "==", id)
      );
      const querySnapshot = await getDocs(Reviews);
      querySnapshot.forEach((doc) => {
        topList.push({ id: doc.id, ...doc.data() });
      });
      setReviews(topList);
    };
    getReviews();
  }, []);
  return (
    <>
      <Modal
        open={openeReview}
        onClose={() => setOpeneReview(false)}
        user={user}
        product={product}
      />
      <PremiumProductModal
        open={openModal}
        user={user}
        product={product}
        onClose={() => setOpenModel(false)}
      />
      <div className="wrapper">
        <div className="row">
          <div className="col-md-6 col-sm-12 col-lg-6">
            <div className="product-thumbnail">
              <div className="premium_label">Premium</div>
              <img src={product?.image} />
            </div>
          </div>
          <div className="col-md-6 col-sm-12 col-lg-6">
            <h2 className="title">{product?.title}</h2>
            <div className="hide-small reviews space-x-[1px] mb-3">
              <h2 className="reviews">Customer Reviews</h2>
              <div className="review-container">
                <div className="review-icons">
                  <span>
                    <svg
                      width="18"
                      height="17"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                        fill="#FFA800"
                      ></path>
                    </svg>
                  </span>
                  <span>
                    <svg
                      width="18"
                      height="17"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                        fill="#FFA800"
                      ></path>
                    </svg>
                  </span>
                  <span>
                    <svg
                      width="18"
                      height="17"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                        fill="#FFA800"
                      ></path>
                    </svg>
                  </span>
                  <span>
                    <svg
                      width="18"
                      height="17"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                        fill="#FFA800"
                      ></path>
                    </svg>
                  </span>
                  <span>
                    <svg
                      width="18"
                      height="17"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                        fill="#FFA800"
                      ></path>
                    </svg>
                  </span>
                  <span>
                    Based on <span style={{ fontWeight: 700 }}> 2 </span>reviews
                  </span>
                </div>

                <div className="review-button">
                  <button
                    data-bs-toggle="buy_btn"
                    data-bs-target="#kt_modal_1"
                    className="buy_btn "
                    onClick={handleButtonClick}
                  >
                    Write a review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="review-section hide-large">
          <div className="reviews space-x-[1px] mb-3">
            <h2 className="reviews">Customer Reviews</h2>
            <div className="review-container">
              <div className="review-icons">
                <span>
                  <svg
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                      fill="#FFA800"
                    ></path>
                  </svg>
                </span>
                <span>
                  <svg
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                      fill="#FFA800"
                    ></path>
                  </svg>
                </span>
                <span>
                  <svg
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                      fill="#FFA800"
                    ></path>
                  </svg>
                </span>
                <span>
                  <svg
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                      fill="#FFA800"
                    ></path>
                  </svg>
                </span>
                <span>
                  <svg
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                      fill="#FFA800"
                    ></path>
                  </svg>
                </span>
                <span>
                  Based on <span style={{ fontWeight: 700 }}>2</span>reviews
                </span>
                <div className="review-button ">
                  <button
                    data-bs-toggle="buy_btn"
                    data-bs-target="#kt_modal_1"
                    className="buy_btn "
                    onClick={handleButtonClick}
                  >
                    Write a review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reviews-data">
          {reviews?.map((item, index) => (
            <>
              <div key={index} className="review_body">
                <Stars score={item.score} />
                <p className="reviewer">Review from {item.username}</p>
                <div className="titlex">{item.title}</div>
                <div>{item.body}</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default PremiumProductDetails;
