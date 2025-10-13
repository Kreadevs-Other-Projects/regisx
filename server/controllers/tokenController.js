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
      .limit(1)
      .exec();

    const nextNumber = (lastToken?.number || 0) + 1;

    const newToken = new Token({
      userId,
      organizationId,
      number: nextNumber,
    });

    await newToken.save();

    await Organization.findByIdAndUpdate(organizationId, {
      $inc: { totalQueueTickets: 1 },
    });

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

    res.json({
      success: true,
      count: tokens.length,
      tokens,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const serveNextToken = async (req, res) => {
  try {
    const { organizationId } = req.body;

    const org = await Organization.findById(organizationId);
    if (!org) return res.status(404).json({ error: "Organization not found" });

    await Token.findOneAndUpdate(
      { organizationId, status: "serving" },
      { status: "completed" }
    );

    const nextToken = await Token.findOne({
      organizationId,
      status: "waiting",
    }).sort({ number: 1 });

    if (!nextToken) {
      org.currentQueueNumber = null;
      await org.save();
      return res.json({ message: "No tokens waiting in queue" });
    }

    nextToken.status = "serving";
    await nextToken.save();

    org.currentQueueNumber = nextToken.number;
    await org.save();

    res.json({
      success: true,
      servingToken: nextToken.number,
      message: `Now serving token ${nextToken.number} for ${org.name}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllTokens = async (req, res) => {
  try {
    const tokens = await Token.find()
      .populate("userId", "username email")
      .populate("organizationId", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: tokens.length,
      tokens,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTokenById = async (req, res) => {
  try {
    const { id } = req.params;

    const token = await Token.findById(id)
      .populate("userId", "username email")
      .populate("organizationId", "name");

    if (!token) {
      return res.status(404).json({ error: "Token not found" });
    }

    res.json({
      success: true,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
