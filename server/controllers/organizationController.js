import Organization from "../models/Organization.js";
import User from "../models/User.js";

export const createOrganization = async (req, res) => {
  try {
    const { name, userId } = req.body;

    if (!name || !userId) {
      return res
        .status(400)
        .json({ error: "Organization name and userId are required" });
    }

    const org = new Organization({ name });
    await org.save();

    await User.findByIdAndUpdate(userId, { $push: { organizations: org._id } });

    res.json({ success: true, organization: org });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserOrganizations = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("organizations");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ success: true, organizations: user.organizations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
