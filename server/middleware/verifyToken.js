import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const token = req.headers["authorization"]
    ? req.headers["authorization"].split(" ")[1]
    : null;
  // console.log("verifyToken, token", token);
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // console.log("decodedToken", decodedToken);
  if (!decodedToken) {
    return res.status(401).json({ message: "Failed to authenticate token." });
  }
  req.decodedToken = decodedToken;
  next();
}

export default verifyToken;
