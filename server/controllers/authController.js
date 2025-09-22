import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Organization from "../models/Organization.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    console.log(`internal server error`, err);
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("organizations");

    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      success: true,
      token,
      organizations: user.organizations,
    });
  } catch (err) {
    console.log(`internal server error`, err);
    res.status(500).json({ error: err.message });
  }
};

export const selectOrganization = async (req, res) => {
  try {
    const { token, organizationId } = req.body;

    if (!token || !organizationId) {
      return res
        .status(400)
        .json({ error: "Token and organizationId required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newToken = jwt.sign(
      { userId: decoded.userId, organizationId },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ success: true, token: newToken });
  } catch (err) {
    console.log(`internal server error`, err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
