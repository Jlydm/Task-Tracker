import jwt from "jsonwebtoken";

export const authenticationMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          return res.status(401).json({ message: "Invalid token" });
        }
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired" });
        }
        return res.status(401).json({ message: "Authentication failed" });
      }

      req.user = {
        id: decoded.id,
        name: decoded.name,
      };
    });

    next();
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
