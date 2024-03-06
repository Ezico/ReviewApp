import { db } from "../db.js";

export const getUsers = (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

export const searchUsers = (req, res) => {
  const email = req.params.id;
  const q =
    "SELECT * FROM users WHERE email = ? OR firstName = ? OR lastName = ?";
  db.query(q, [email, email, email], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

export const getUser = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM users WHERE userId = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

export const updateCredit = (req, res) => {
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
};

export const updateCreditPremium = (req, res) => {
  const q = "UPDATE users SET balance = ? WHERE userId = ?";
  const values = [req.body.balance];
  db.query(q, [values, req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

export const updateUser = (req, res) => {
  const userId = req.params.id;
  const q = "UPDATE users SET balance = ?, rewardFee = ? WHERE userId = ?";
  const values = [req.body.balance, req.body.rewardFee];

  db.query(q, [...values, userId], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("User has been updated!");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM users  WHERE id = ? ";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("User has been deleted!");
  });
};
