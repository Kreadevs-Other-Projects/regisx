import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Organization from "../models/Organization.js";
import Member from "../models/Member.js";
import Category from "../models/Category.js";

export const registerOrganization = async (req, res) => {
  try {
    const { name, email, password, address, timing } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email and password are required" });
    }

    const existing = await Organization.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const org = new Organization({
      name,
      email,
      password: hashedPassword,
      address,
      timing,
    });

    await org.save();

    const { password: _, ...orgData } = org.toObject();

    res.json({
      success: true,
      message: "Organization registered",
    });
  } catch (err) {
    console.error("Register Organization Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const loginOrganization = async (req, res) => {
  try {
    const { email, password } = req.body;

    const org = await Organization.findOne({ email });
    if (!org) return res.status(404).json({ error: "Organization not found" });

    const isMatch = await bcrypt.compare(password, org.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ orgId: org._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({ success: true, token, organization: org });
  } catch (err) {
    console.error("Login Organization Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const orgId = req.user.orgId;

    if (!name) return res.status(400).json({ error: "Category name required" });

    const category = new Category({ name, organization: orgId });
    await category.save();

    await Organization.findByIdAndUpdate(orgId, {
      $push: { categories: category._id },
    });

    res.json({ success: true, category });
  } catch (err) {
    console.error("Create Category Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const addMember = async (req, res) => {
  try {
    const { categoryId, name, role, specialization } = req.body;
    const orgId = req.user.orgId;

    const category = await Category.findOne({
      _id: categoryId,
      organization: orgId,
    });
    if (!category) {
      return res
        .status(403)
        .json({ error: "You can only add members to your own categories" });
    }

    const member = new Member({
      name,
      role,
      specialization,
      category: categoryId,
    });
    await member.save();

    await Category.findByIdAndUpdate(categoryId, {
      $push: { members: member._id },
    });

    res.json({ success: true, member });
  } catch (err) {
    console.error("Add Member Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find()
      .populate("categories")
      .lean();

    res.json({ success: true, organizations });
  } catch (err) {
    console.error("Get All Organizations Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;

    const organization = await Organization.findById(id)
      .populate({
        path: "categories",
        populate: { path: "members" },
      })
      .lean();

    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }

    res.json({ success: true, organization });
  } catch (err) {
    console.error("Get Organization By ID Error:", err);
    res.status(500).json({ error: err.message });
  }
};
