import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import tokenRoute from "./routes/tokenRoute.js";
import organizationRoute from "./routes/organizationRoute.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

connectDB(process.env.MONGO_URI);

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/auth", authRoute);
app.use("/api/user", tokenRoute);
app.use("/api/org", organizationRoute);

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
