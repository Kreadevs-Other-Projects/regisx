import express from "express";
import {
  createOrganization,
  getUserOrganizations,
} from "../controllers/organizationController.js";

const router = express.Router();

router.post("/create", createOrganization);
router.get("/user/:userId", getUserOrganizations);

export default router;
