import express from "express";
import {
  generateToken,
  getOrganizationTokens,
  serveNextToken,
  getAllTokens,
  getTokenById,
} from "../controllers/tokenController.js";

const router = express.Router();

router.post("/generateToken", generateToken);
router.get("/getOrganizationTokens/:id", getOrganizationTokens);
router.post("/serveNextToken", serveNextToken);
router.get("/getAllTokens", getAllTokens);
router.get("/getTokenById/:id", getTokenById);

export default router;
