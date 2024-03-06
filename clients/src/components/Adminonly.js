import { Navigate } from "react-router-dom";
const Protected = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default Protected;

// import { collection, getDocs, query } from "firebase/firestore";
// import { useEffect } from "react";
// import { useState } from "react";
// import { Navigate } from "react-router-dom";
// import { auth, db } from "../firebase";
// const Protected = ({ children }) => {
//   const [users, setUsers] = useState([]);
//   const [admin, setAdmin] = useState([]);
//   const [auth, setAuth] = useState([]);

//   const getUser = async (id) => {
//     let topList = [];
//     const Users = query(collection(db, "Users"));
//     const querySnapshot = await getDocs(Users);
//     querySnapshot.forEach((doc) => {
//       topList.push({ id: doc.id, ...doc.data() });
//     });

//     // const isAdmin = users.filter((users) => {
//     //   return users.userId == id && users.isAdmin == true;
//     // });
//     console.log(topList);

//     // console.log(isAdmin);
//     // setAdmin(isAdmin);
//   };

//   // check signin
//   useEffect(() => {
//     auth.onAuthStateChanged((authUser) => {
//       if (authUser) {
//         getUser(authUser.uid);
//         setAuth(authUser.uid);
//       } else {
//       }
//     });
//     getUser(auth);
//   }, []);

//   if (admin.length > 0) {
//     return <Navigate to="/adminstrator-access" replace />;
//   }
//   return children;
// };
// export default Protected;
