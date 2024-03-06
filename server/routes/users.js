import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  searchUsers,
  updateCredit,
  updateCreditPremium,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/search/:id", searchUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.put("/credit/:id", updateCredit);
router.put("/credit/premium/:id", updateCreditPremium);

export default router;
