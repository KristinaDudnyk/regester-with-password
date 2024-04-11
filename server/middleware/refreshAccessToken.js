import jwt from "jsonwebtoken";

function refreshAccessToken(req, res, next) {
  const refreshToken = req.headers["RefreshToken"]
    ? req.headers["RefreshToken"].split(" ")[1]
    : null;
  // console.log("refreshAccessToken, refreshToken", refreshToken);
  if (!refreshToken) {
    return res.status(401).json({ message: "No refreshToken provided." });
  }
  const decodedRefreshToken = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET
  );
  // console.log("decodedRefreshToken", decodedRefreshToken);
  if (!decodedRefreshToken) {
    return res
      .status(401)
      .json({ message: "Failed to authenticate refreshToken." });
  }
  req.decodedRefreshToken = decodedRefreshToken;
  next();
}

export default refreshAccessToken;
