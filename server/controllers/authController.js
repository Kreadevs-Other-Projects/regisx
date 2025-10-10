import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "Name, email, and password are required",
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const pic = req.file ? `/uploads/${req.file.filename}` : null;

    const user = new User({
      name,
      email,
      password: hashedPassword,
      pic,
    });

    await user.save();

    res.status(201).json({
      success: true,
      status: 201,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
      },
    });
  } catch (err) {
    console.error("Register User Error:", err);
    res.status(500).json({
      success: false,
      status: 500,
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("organizations");
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        error: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      status: 200,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        organizations: user.organizations,
      },
    });
  } catch (err) {
    console.error("Login User Error:", err);
    res.status(500).json({
      success: false,
      status: 500,
      error: err.message,
    });
  }
};

export const selectOrganization = async (req, res) => {
  try {
    const { token, organizationId } = req.body;

    if (!token || !organizationId) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "Token and organizationId are required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newToken = jwt.sign(
      { userId: decoded.userId, organizationId },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      success: true,
      status: 200,
      message: "Organization selected successfully",
      token: newToken,
    });
  } catch (err) {
    console.error("Select Organization Error:", err);
    res.status(401).json({
      success: false,
      status: 401,
      error: "Invalid or expired token",
    });
  }
};
