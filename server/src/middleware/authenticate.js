import jwt from "jsonwebtoken";

export const authenticationMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {id, name} = decoded;
    req.user = {id, name}

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", err });
  }
};
