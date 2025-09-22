import express from "express";
import {
  register,
  login,
  selectOrganization,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/select-organization", selectOrganization);

export default router;
