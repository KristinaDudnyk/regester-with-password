import findUserByID from "../helpers/findUserByID.js";

async function verifyAdmin(req, res, next) {
  const { userId } = req.decoded;
  console.log("const { userId } = req.decoded", userId);

  const user = await findUserByID(userId);

  if (!user.admin || user.admin === undefined) {
    return res
      .status(403)
      .send(`You don't have a right permissions to access this list of users`);
  }
  next();
}

export default verifyAdmin;
