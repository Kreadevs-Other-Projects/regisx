import express from "express";
import {
  generateToken,
  getOrganizationTokens,
} from "../controllers/tokenController.js";

const router = express.Router();

router.post("/token/generate", generateToken);
router.get("/token/:organizationId", getOrganizationTokens);

export default router;
