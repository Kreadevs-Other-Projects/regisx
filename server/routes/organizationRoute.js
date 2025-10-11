import express from "express";
import upload from "../middleware/upload.js";
const router = express.Router();
import {
  registerOrganization,
  verifyEmail,
  loginOrganization,
  createCategory,
  addMember,
  getAllOrganizations,
  getOrganizationById,
  updateOrgTimingAndDays,
} from "../controllers/organizationController.js";

router.post("/register", upload.single("logo"), registerOrganization);
router.post("/verifyEmail", verifyEmail);
router.post("/login", loginOrganization);
router.post("/categories", createCategory);
router.post("/members", addMember);
router.get("/organizations", getAllOrganizations);
router.get("/organizations/:id", getOrganizationById);
router.put("/updateTiming/:id", updateOrgTimingAndDays);

export default router;
