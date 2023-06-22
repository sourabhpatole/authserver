const jwt = require("jsonwebtoken");
const userdb = require("../models/UserSchema");
const keySecret = process.env.JWT_TOKEN;

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log(token);
    const verifyToken = jwt.verify(token, keySecret);
    // console.log(verifyToken);
    const rootUser = await userdb.findOne({ _id: verifyToken._id });
    // console.log(rootUser.name);
    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ status: 401, message: "Unauthorized no token provided" });
  }
};
module.exports = authenticate;
