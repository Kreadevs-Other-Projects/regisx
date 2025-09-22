import Token from "../models/Token.js";
import Organization from "../models/Organization.js";

export const generateToken = async (req, res) => {
  try {
    const { userId, organizationId } = req.body;

    if (!userId || !organizationId) {
      return res
        .status(400)
        .json({ error: "userId and organizationId are required" });
    }

    const org = await Organization.findById(organizationId);
    if (!org) return res.status(404).json({ error: "Organization not found" });

    const lastToken = await Token.findOne({ organizationId })
      .sort({ number: -1 })
      .exec();

    const nextNumber = lastToken ? lastToken.number + 1 : 1;

    const newToken = new Token({
      userId,
      organizationId,
      number: nextNumber,
    });

    await newToken.save();

    res.json({
      success: true,
      tokenNumber: nextNumber,
      message: `Token ${nextNumber} generated for organization ${org.name}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrganizationTokens = async (req, res) => {
  try {
    const { organizationId } = req.params;

    const tokens = await Token.find({ organizationId })
      .populate("userId", "username email")
      .sort({ number: 1 });

    res.json(tokens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
