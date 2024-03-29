import jwt from "jsonwebtoken";

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
  // Get token from headers, query parameters, or body
  console.log(req.headers);
  const token = req.headers["authorization"]
    ? req.headers["authorization"].split(" ")[1]
    : null;
  console.log(token);
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token." });
    }
    // If token is valid, save decoded token to request for use in other routes
    req.decoded = decoded;

    next();
  });
}

export default verifyToken;
