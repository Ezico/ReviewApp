import { Link } from "react-router-dom";
import Prem from "../assets/images/prem.png";
import React from "react";

const LatestProduct = ({ products }) => {
  return (
    <>
      <div className="wrapper">
        <div class="latest-container">
          <h2 style={{ color: "black" }}>
            Top Products |
            <span style={{ color: "rgb(254 189 104))" }}> For This Week</span>
          </h2>

          <p>
            Don’t miss out on this week’s top products to write reviews about,
            top products to tap into the knowledge and experience of these
            successful black professionals.
          </p>
          <br />
        </div>
        <div className="product-row">
          {products.map((item) => (
            <>
              {item.premium == "yes" ? (
                <div key={item.id} className="product-container">
                  <a href={`/amazon/review/premium/${item.url}`}>
                    <div className="prem">Premium</div>
                    <div
                      className="product-media"
                      style={{ backgroundImage: `url(${item?.image})` }}
                    ></div>
                  </a>
                  <div className="product-details">
                    <div class="reviews space-x-[1px] mb-3">
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
                    </div>

                    <div className="product-title">{item.title}</div>
                  </div>
                  <br />
                </div>
              ) : (
                <div key={item.id} className="product-container">
                  <a href={`/amazon/review/normal/${item.url}`}>
                    <div
                      className="product-media"
                      style={{ backgroundImage: `url(${item?.image})` }}
                    ></div>
                  </a>
                  <div className="product-details">
                    <div class="reviews space-x-[1px] mb-3">
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
                    </div>

                    <div className="product-title">{item.title}</div>
                  </div>
                  <br />
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default LatestProduct;
