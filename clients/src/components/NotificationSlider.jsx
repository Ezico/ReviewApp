import React from "react";
import Slider from "react-slick";
import UserIcon from "./UserIcon";

const NotificationSlider = () => {
  const settings = {
    vertical: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 300,
  };
  return (
    <div>
      <div className="wrapper">
        <Slider {...settings}>
          <div className="site-info">
            <div className="itermsstyles van-swipe-item">
              <div className="lefticons">
                <UserIcon />
              </div>
              <div className="middlescontents">
                <div className="accountnums">***010</div>
                <div className="ordestatus" style={{ color: "red" }}>
                  Successful withdrew{" "}
                  <span style={{ color: "#10b981", fontWeight: "700" }}>
                    ₦6,150
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="site-info">
            <div className="itermsstyles van-swipe-item">
              <div className="lefticons">
                <UserIcon />
              </div>
              <div className="middlescontents">
                <div className="accountnums">***100</div>
                <div className="ordestatus" style={{ color: "red" }}>
                  Successful withdrew{" "}
                  <span style={{ color: "#10b981", fontWeight: "700" }}>
                    ₦18,950
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="site-info">
            <div className="itermsstyles van-swipe-item">
              <div className="lefticons">
                <UserIcon />
              </div>
              <div className="middlescontents">
                <div className="accountnums">***002</div>
                <div className="ordestatus" style={{ color: "red" }}>
                  Successful withdrew{" "}
                  <span style={{ color: "#10b981", fontWeight: "700" }}>
                    ₦3,400
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="site-info">
            <div className="itermsstyles van-swipe-item">
              <div className="lefticons">
                <UserIcon />
              </div>
              <div className="middlescontents">
                <div className="accountnums">***911</div>
                <div className="ordestatus" style={{ color: "red" }}>
                  Successful withdrew{" "}
                  <span style={{ color: "#10b981", fontWeight: "700" }}>
                    ₦16,004
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="site-info">
            <div className="itermsstyles van-swipe-item">
              <div className="lefticons">
                <UserIcon />
              </div>
              <div className="middlescontents">
                <div className="accountnums">***643</div>
                <div className="ordestatus" style={{ color: "red" }}>
                  Successful withdrew{" "}
                  <span style={{ color: "#10b981", fontWeight: "700" }}>
                    ₦16,050
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default NotificationSlider;
