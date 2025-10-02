import express from "express";
import {
  registerOrganization,
  loginOrganization,
  createCategory,
  addMember,
  getAllOrganizations,
  getOrganizationById,
} from "../controllers/organizationController.js";

const router = express.Router();

router.post("/register", registerOrganization);
router.post("/login", loginOrganization);
router.post("/categories", createCategory);
router.post("/members", addMember);
router.get("/organizations", getAllOrganizations);
router.get("/organizations/:id", getOrganizationById);

export default router;
