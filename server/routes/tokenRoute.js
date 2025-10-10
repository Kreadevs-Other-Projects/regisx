import express from "express";
import {
  generateToken,
  getOrganizationTokens,
  serveNextToken,
} from "../controllers/tokenController.js";

const router = express.Router();

router.post("/generateToken", generateToken);
router.get("/getOrganizationTokens/:id", getOrganizationTokens);
router.post("/serveNextToken", serveNextToken);

export default router;
