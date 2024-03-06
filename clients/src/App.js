import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Auth from "./pages/Auth";
import { Routes, Route, useNavigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import "./media-query.css";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  getDocs,
  where,
} from "firebase/firestore";

import Terms from "./pages/Terms";
import Policy from "./pages/Policy";
import Cookies from "./pages/Cookies";
import Protected from "./components/protected";
import Adminonly from "./components/Adminonly";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import Product from "./pages/Product";
import SignupSuccess from "./pages/SignupSuccess";
import Amazon from "./pages/Amazon";
import ProductPremium from "./pages/ProductPremium";
import PaymentPage from "./pages/PaymentPage";
import Withdraw from "./components/Withdraw";
function App() {
  const [user, setUser] = useState(null);
  const [loggeduser, setLoggedUser] = useState(null);
  const uid = sessionStorage.getItem("uid");
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async (e) => {
    const getUserfromDb = query(
      collection(db, "Users"),
      where("userId", "==", uid)
    );
    const querySnapshot = await getDocs(getUserfromDb);
    querySnapshot.forEach((doc) => {
      setLoggedUser({ id: doc.id, ...doc.data() });
    });
  };

  // push to top page after loading
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // check signin
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        sessionStorage.setItem("uid", authUser.uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate("/");
    });
    window.location.reload();
    sessionStorage.clear();
  };

  // GET ALL POSTS FROM DB
  // const [loading, setLoading] = useState(false);
  const [ReviewProducts, setReviewProducts] = useState([]);

  // get all products

  useEffect(() => {
    const getData = async (e) => {
      let topList = [];
      const Products = query(
        collection(db, "Products"),
        orderBy("date", "desc")
      );
      const querySnapshot = await getDocs(Products);
      querySnapshot.forEach((doc) => {
        topList.push({ id: doc.id, ...doc.data() });
      });

      setReviewProducts(topList);
    };
    getData();
  }, []);

  // get featured podcasts
  // useEffect(() => {
  //   const collectionRef = collection(db, "Podcasts");
  //   const topQuerry = query(collectionRef, orderBy("date", "desc"), limit(6));

  //   const unsubxx = onSnapshot(
  //     topQuerry,
  //     (snapshot) => {
  //       let topList = [];
  //       snapshot.docs.forEach((doc) => {
  //         topList.push({ id: doc.id, ...doc.data() });
  //         setTopList(topList);
  //       });
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );

  //   return () => {
  //     unsubxx();
  //   };
  // }, []);
  //
  // console.log(loggeduser);

  const handleBlogDelete = async (id) => {
    if (window.confirm("are you sure you want to delete this post?")) {
      try {
        // setLoading(true);
        await deleteDoc(doc(db, "Posts", id));
        toast.success("Blog Deleted Successfully");
        // setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleResourceDelete = async (id) => {
    if (window.confirm("are you sure you want to delete this item?")) {
      try {
        await deleteDoc(doc(db, "Resources", id));
        toast.success("Resource Deleted Successfully");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handlePodcastDelete = async (id) => {
    if (window.confirm("are you sure you want to delete this Podcast?")) {
      try {
        // setLoading(true);
        await deleteDoc(doc(db, "Podcasts", id));
        toast.success("Podcast Deleted Successfully");
        // setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Routes>
        <Route
          path="/"
          element={
            <Amazon
              products={ReviewProducts}
              user={loggeduser}
              handleLogout={handleLogout}
            />
          }
        />
        <Route
          path="/amazon"
          element={<Amazon products={ReviewProducts} user={loggeduser} />}
        />
        <Route
          path="/withdraw"
          element={<Withdraw products={ReviewProducts} user={loggeduser} />}
        />
        <Route
          path="/login/success"
          element={<SignupSuccess user={loggeduser} />}
        />

        <Route path="*" element={<NotFound />} />
        <Route
          path="/admin/login"
          element={<AdminLogin handleLogout={handleLogout} user={user} />}
        />

        <Route
          path="/login"
          element={<Auth handleLogout={handleLogout} user={user} />}
        />
        <Route
          path="/register"
          element={<Signup handleLogout={handleLogout} user={user} />}
        />
        <Route
          path="/contact"
          element={<Contact handleLogout={handleLogout} user={user} />}
        />
        <Route
          path="/policy"
          element={<Policy handleLogout={handleLogout} user={user} />}
        />
        <Route
          path="/about"
          element={<About handleLogout={handleLogout} user={user} />}
        />
        <Route
          path="/terms"
          element={<Terms handleLogout={handleLogout} user={user} />}
        />
        <Route
          path="/cookies"
          element={<Cookies handleLogout={handleLogout} user={user} />}
        />
        <Route
          path="/adminstrator-access/create-user"
          element={<Signup handleLogout={handleLogout} user={user} />}
        />
        <Route
          path="/amazon/review/normal/:id"
          element={
            <Protected user={user}>
              <Product handleLogout={handleLogout} user={loggeduser} />
            </Protected>
          }
        />
        <Route
          path="/amazon/review/premium/:id"
          element={
            <Protected user={user}>
              <ProductPremium handleLogout={handleLogout} user={loggeduser} />
            </Protected>
          }
        />
        <Route
          path="/how-it-works"
          element={
            <ProductPremium handleLogout={handleLogout} user={loggeduser} />
          }
        />
        <Route
          path="/buy/:id"
          element={
            <PaymentPage handleLogout={handleLogout} user={loggeduser} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
