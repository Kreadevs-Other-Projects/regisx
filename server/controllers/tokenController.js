import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mySuperSecretKey";

export const generateUserToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
};

export const generateOrgToken = (userId, organizationId) => {
  return jwt.sign({ userId, organizationId }, SECRET_KEY, { expiresIn: "2h" });
};

export const verifyToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ valid: true, decoded });
  } catch (err) {
    res.status(401).json({ valid: false, error: "Invalid or expired token" });
  }
};
