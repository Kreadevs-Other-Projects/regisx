import express from "express";
import { generateToken, verifyToken } from "../controllers/tokenController.js";

const router = express.Router();

router.post("/generate", generateToken);
router.post("/verify", verifyToken);

export default router;
