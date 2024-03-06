import mysql from "mysql";
export const db = mysql.createConnection({
  host: "sbg106.truehost.cloud",
  user: "adailyre_admin",
  password: "Hotpasskey1@",
  database: "adailyre_review",
});

db.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  // console.log("Connected to the MySQL server.");
});
export default db;
