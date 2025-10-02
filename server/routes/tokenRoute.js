import express from "express";
import {
  generateToken,
  getOrganizationTokens,
  serveNextToken,
} from "../controllers/tokenController.js";

const router = express.Router();

router.post("/token/generate", generateToken);
router.get("/token/:organizationId", getOrganizationTokens);
router.post("/serve", serveNextToken);

export default router;
