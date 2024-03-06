import React from "react";

const SignupSuccess = () => {
  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <br />
        <br />
        <br />
        <div className="col-12 text-center">
          <div className="row h-100 justify-content-center align-item-center">
            <div className="col-10 col-md-8 col-lg-4 primary-bg">
              <div className="text-center heading py-2 text-light">
                Login Success
              </div>
              <a
                href="/"
                style={{
                  marginLeft: "5px",
                  color: "white",
                  textDecoration: "underline",
                }}
              >
                <button className="action">Proceed to homepage</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccess;
