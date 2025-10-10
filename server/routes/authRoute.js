import express from "express";
import upload from "../middleware/upload.js";
const router = express.Router();
import {
  register,
  login,
  selectOrganization,
} from "../controllers/authController.js";

router.post("/register", upload.single("pic"), register);
router.post("/login", login);
router.post("/selectOrganization", selectOrganization);

export default router;
