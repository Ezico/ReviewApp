import React from "react";

const Stars = ({ score }) => {
  return (
    <>
      <div
        className="review-start"
        dangerouslySetInnerHTML={{
          __html: (() => {
            let rating = "";
            for (let i = 0; i < 5; i++) {
              if (i < score) {
                rating += `<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z" fill="#febd68"></path></svg>`;
              } else {
                rating += `<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z" fill="#d5d5d5"></path></svg>`;
              }
            }
            return rating;
          })(),
        }}
      />
    </>
  );
};

export default Stars;
