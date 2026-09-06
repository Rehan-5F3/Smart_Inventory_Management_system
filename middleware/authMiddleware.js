const jwt = require("jsonwebtoken");


const protect = (req, res, next) => {
  try {
    console.log("AUTH HEADER:", req.headers.authorization);
    console.log("JWT SECRET:", process.env.JWT_SECRET);

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const actualToken = token.replace("Bearer ", "");

    console.log("TOKEN:", actualToken);

    const decoded = jwt.verify(
      actualToken,
      process.env.JWT_SECRET || "mysecretkey"
    );

    console.log("DECODED:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);

    res.status(401).json({
      message: "Invalid Token",
    });
  }
};


module.exports = { protect };