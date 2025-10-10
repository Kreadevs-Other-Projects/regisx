import express from "express";
import upload from "../middleware/upload.js";
const router = express.Router();
import {
  registerOrganization,
  loginOrganization,
  createCategory,
  addMember,
  getAllOrganizations,
  getOrganizationById,
} from "../controllers/organizationController.js";

router.post("/register", upload.single("logo"), registerOrganization);
router.post("/login", loginOrganization);
router.post("/categories", createCategory);
router.post("/members", addMember);
router.get("/organizations", getAllOrganizations);
router.get("/organizations/:id", getOrganizationById);

export default router;
