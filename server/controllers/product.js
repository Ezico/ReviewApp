import { db } from "../db.js";

export const getProducts = (req, res) => {
  const q = "SELECT * FROM products";
  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};
export const getOrders = (req, res) => {
  const q = "SELECT * FROM premiumorders";
  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

export const getReviews = (req, res) => {
  const q = "SELECT * FROM reviews WHERE PRODUCT = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

export const getProduct = (req, res) => {
  res.json("hi post");
};
export const approveOrder = (req, res) => {
  const q = "UPDATE premiumorders SET approved = ? WHERE orderIdentifyer = ?";
  const values = [req.body.approved, req.body.orderIdentifyer];
  db.query(q, [...values], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("ORDER has been approved!");
  });
  // console.log(req.params.id);
};

export const premiumOrder = (req, res) => {
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
};

export const addProduct = (req, res) => {
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
    return res.status(200).json("post has been created!");
  });
};

export const addReview = (req, res) => {
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
};

export const getProductData = (req, res) => {
  const q = "SELECT * FROM products WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};
export const updateProduct = (req, res) => {
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
};

export const getBank = (req, res) => {
  const q = "SELECT * FROM bank WHERE id = 1";
  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

export const checkStatus = (req, res) => {
  const q = "SELECT * FROM premiumorders WHERE orderIdentifyer = ? ";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

export const updateBank = (req, res) => {
  const q = "UPDATE bank SET Account = ?, Bank = ?, Name = ? WHERE id = 1;";
  const values = [req.body.account, req.body.bank, req.body.name, 1];
  db.query(q, [...values], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("Bank has been updated!");
  });
  // console.log(req.params.id);
};

export const deleteProduct = (req, res) => {
  const q = "DELETE FROM products  WHERE id = ? ";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("product has been deleted!");
  });
};
