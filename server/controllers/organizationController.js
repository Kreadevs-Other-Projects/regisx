import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Organization from "../models/Organization.js";

export const registerOrganization = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
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
    });

    await org.save();

    res.json({
      success: true,
      message: "Organization registered",
      organization: org,
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
