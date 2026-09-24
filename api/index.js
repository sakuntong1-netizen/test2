const app = require("../server/src/app");
const connectDB = require("../server/src/config/db");

// Vercel invokes this exported handler; do not call app.listen() here.
module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    return res.status(503).json({ message: "Database temporarily unavailable" });
  }
};
