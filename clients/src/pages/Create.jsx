import React, { useEffect, useState } from "react";
import AdminContent from "../components/AdminContent";
import AdminHeader from "../components/AdminHeader";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { formats, modules } from "../components/EditorToolbar";

const initialState = {
  title: "",
  image: "",
  premium: "no",
};
const getInitialState = () => {
  const value = "Amazon";
  return value;
};

const Create = ({ user, handleLogout }) => {
  const [form, setForm] = useState(initialState);
  const [descriptionvalue, setDescriptionValue] = useState();
  const [origin, setOrigin] = useState(getInitialState);
  const { title, premium, image } = form;

  const handleOriginChange = (e) => {
    setOrigin(e.target.value);
  };
  // push to top page after loadings
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSUbmit = async (e) => {
    e.preventDefault();

    const formatedDescrition = "<div>" + descriptionvalue + "</div>";
    var urlspc = title.replace(/[&\/\\ #,+()$~%.'":*<>{}]/g, "-").toLowerCase();
    var nospc = urlspc.replace(/[|&\/\\#,+()$~%.'":*<>{}]/g, "").toLowerCase();
    var url = nospc.replaceAll(/--/g, "-");
    let newDoc = {
      description: formatedDescrition,
      origin: origin,
      ...form,
    };

    // remove (-) from urls
    var lastData = url[url.length - 1];
    if (
      lastData === "-" ||
      lastData === "--" ||
      lastData === "---" ||
      lastData === "----"
    ) {
      var newUrl = url.slice(0, -1);
    } else {
      newUrl = url;
    }

    console.log(newDoc);
    // if (title && premium) {
    //   try {
    //     await addDoc(collection(db, "Products"), {
    //       ...newDoc,
    //       url: newUrl,
    //       author: user.displayName,
    //       userId: user.uid,
    //       date: serverTimestamp(),
    //     });
    //     toast.success("Podcast Created Successfully");
    //   } catch (err) {
    //     toast.error("Not Added" + err);
    //   }
    // }

    // else if (title && premium == "no") {
    //   alert("not premium");
    // }
    // navigate("/admin/create-podcast");
  };
  const handleFeatured = (e) => {
    setForm({ ...form, premium: e.target.value });
  };

  return (
    <>
      <AdminHeader user={user} handleLogout={handleLogout} />

      <div
        className="wrapperx d-flex flex-column flex-row-fluid"
        id="kt_wrapper"
      >
        <div className="d-flex flex-column flex-lg-row flex-column-fluid">
          <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-5 order-2 order-lg-1">
            <div className="card card-custom">
              <div className="card-header">
                <div className="card-title">
                  <h1 className=" fw-bolder mb-3">Create Product</h1>
                </div>
                <div className="card-toolbar">
                  <Link to="/admin">
                    <button type="button" className="btn btn-sm btn-primary">
                      CANCEL
                    </button>
                  </Link>
                </div>
              </div>
              <div className="card-scroll">
                <div className="d-flex flex-center flex-column flex-lg-row-fluid">
                  <div className="" style={{ width: "95%" }}>
                    <div className="fv-row mb-8 fv-plugins-icon-container">
                      <label className="text-gray-500" htmlFor="title">
                        Product Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        autocomplete="off"
                        value={title}
                        className="form-control bg-transparent"
                        onChange={handleChange}
                      />

                      <div className="fv-plugins-message-container invalid-feedback"></div>
                    </div>

                    <div className="fv-row mb-8 fv-plugins-icon-container">
                      <label className="text-gray-500" htmlFor="title">
                        Description
                      </label>

                      <EditorToolbar toolbarId={"t1"} />
                      <ReactQuill
                        theme="snow"
                        placeheolder="Description"
                        value={descriptionvalue}
                        onChange={setDescriptionValue}
                        modules={modules("t1")}
                        formats={formats}
                      />

                      <div className="fv-plugins-message-container invalid-feedback"></div>
                    </div>
                    <br />
                    <br />
                    <br />

                    <div className="row">
                      <div className="col">
                        <div className="mb-10">
                          <div className="row">
                            <div className="col">Premium Product?</div>
                            <div className="col">
                              <input
                                onChange={handleFeatured}
                                className="form-check-input"
                                type="radio"
                                name="featured"
                                value="yes"
                                checked={premium === "yes"}
                              />
                              <label
                                className="form-check-label"
                                for="flexCheckChecked"
                              >
                                Yes&nbsp;
                              </label>
                              <input
                                onChange={handleFeatured}
                                className="form-check-input"
                                type="radio"
                                name="premium"
                                value="no"
                                checked={premium === "no"}
                              />
                              <label
                                className="form-check-label"
                                for="flexCheckChecked"
                              >
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="fv-row mb-8 fv-plugins-icon-container">
                      <div className="fv-plugins-message-container invalid-feedback"></div>
                    </div>
                    <div class="fv-row mb-8 fv-plugins-icon-container">
                      <div class="mb-10">
                        <label>Product Image</label>
                        <img src={image} alt="" className="w-100" />
                        <input
                          type="text"
                          name="image"
                          autocomplete="off"
                          value={image}
                          className="form-control bg-transparent"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* side two */}

          <div className="d-flex flex-column flex-lg-row-fluid w-lg-25 p-5 order-2 order-lg-2">
            <div className="card card-custom">
              <div className="card-header">
                <h3 className="card-title">ADD NEW PRODUCT</h3>
                <div className="card-toolbar">
                  <button type="button" className="btn btn-sm btn-primary">
                    <button
                      onClick={handleSUbmit}
                      id="kt_sign_in_submit"
                      className="btn btn-dark"
                    >
                      CREATE
                    </button>
                  </button>
                </div>
              </div>
              <div className="card-body card-scroll h-500px">
                <div className="d-flex flex-center flex-column flex-lg-row-fluid">
                  <div className="w-100 p-10">
                    <div className="text-center mb-11">
                      <h1 className=" fw-bolder mb-3">Product Origin</h1>

                      <div className="text-gray-500 fw-semibold fs-6">
                        Select Product Origin below
                      </div>
                    </div>
                    <div className="fv-row mb-8 fv-plugins-icon-container">
                      <label className="text-gray-500" htmlFor="title">
                        Podcast Website
                      </label>
                      <select value={origin} onChange={handleOriginChange}>
                        <option value="Amazon">Amazon</option>
                        <option value="Ebay">Ebay</option>
                        <option value="Jumia">Jumia</option>
                      </select>

                      <div className="fv-plugins-message-container invalid-feedback"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdminContent user={user} />
    </>
  );
};

export default Create;
