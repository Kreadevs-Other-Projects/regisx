import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Organization from "../models/Organization.js";
import Member from "../models/Member.js";
import Category from "../models/Category.js";

export const registerOrganization = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      orgType,
      city,
      country,
      fullAddress,
      timing,
      days,
    } = req.body;

    const logo = req.file ? `/uploads/${req.file.filename}` : null;

    if (
      !name ||
      !email ||
      !password ||
      !orgType ||
      !city ||
      !country ||
      !fullAddress ||
      !timing ||
      !days ||
      !logo
    ) {
      return res.status(400).json({
        success: false,
        status: 400,
        error:
          "All fields (name, email, password, orgType, city, country, fullAddress, timing, days, logo) are required",
      });
    }

    const existing = await Organization.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "Email already registered",
      });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS || 12));
    const hashed = await bcrypt.hash(password, salt);

    const parsedTiming =
      typeof timing === "string" ? JSON.parse(timing) : timing;
    const parsedDays = typeof days === "string" ? JSON.parse(days) : days;

    const org = new Organization({
      name,
      email,
      password: hashed,
      orgType,
      city,
      country,
      fullAddress,
      timing: parsedTiming,
      days: parsedDays,
      logo,
    });

    await org.save();

    res.status(201).json({
      success: true,
      status: 201,
      message: "Organization registered successfully",
      organization: {
        id: org._id,
        name: org.name,
        email: org.email,
        orgType: org.orgType,
        city: org.city,
        country: org.country,
        fullAddress: org.fullAddress,
        timing: org.timing,
        days: org.days,
        logo: org.logo,
      },
    });
  } catch (err) {
    console.error("Register Organization Error:", err);
    res.status(500).json({
      success: false,
      status: 500,
      error: err.message,
    });
  }
};

export const loginOrganization = async (req, res) => {
  try {
    const { email, password } = req.body;

    const org = await Organization.findOne({ email });
    if (!org) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Organization not found",
      });
    }

    const isMatch = await bcrypt.compare(password, org.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign({ orgId: org._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({
      success: true,
      status: 200,
      message: "Login successful",
      token,
      organization: org,
    });
  } catch (err) {
    console.error("Login Organization Error:", err);
    res.status(500).json({
      success: false,
      status: 500,
      error: err.message,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const orgId = req.user.orgId;

    if (!name) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "Category name required",
      });
    }

    const category = new Category({ name, organization: orgId });
    await category.save();

    await Organization.findByIdAndUpdate(orgId, {
      $push: { categories: category._id },
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: "Category created successfully",
      category,
    });
  } catch (err) {
    console.error("Create Category Error:", err);
    res.status(500).json({
      success: false,
      status: 500,
      error: err.message,
    });
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
      return res.status(403).json({
        success: false,
        status: 403,
        error: "You can only add members to your own categories",
      });
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

    res.status(201).json({
      success: true,
      status: 201,
      message: "Member added successfully",
      member,
    });
  } catch (err) {
    console.error("Add Member Error:", err);
    res.status(500).json({
      success: false,
      status: 500,
      error: err.message,
    });
  }
};

export const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find()
      .populate("categories")
      .lean();

    res.status(200).json({
      success: true,
      status: 200,
      organizations,
    });
  } catch (err) {
    console.error("Get All Organizations Error:", err);
    res.status(500).json({
      success: false,
      status: 500,
      error: err.message,
    });
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
      return res.status(404).json({
        success: false,
        status: 404,
        error: "Organization not found",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      organization,
    });
  } catch (err) {
    console.error("Get Organization By ID Error:", err);
    res.status(500).json({
      success: false,
      status: 500,
      error: err.message,
    });
  }
};
