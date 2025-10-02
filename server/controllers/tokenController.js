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

    res.json(tokens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const serveNextToken = async (req, res) => {
  try {
    const { organizationId } = req.body;

    const org = await Organization.findById(organizationId);
    if (!org) return res.status(404).json({ error: "Organization not found" });

    const nextToken = await Token.findOne({
      organizationId,
      status: "waiting",
    }).sort({ number: 1 });

    if (!nextToken) {
      return res.json({ message: "No tokens waiting in queue" });
    }

    await Token.findOneAndUpdate(
      { organizationId, status: "serving" },
      { status: "completed" }
    );

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
