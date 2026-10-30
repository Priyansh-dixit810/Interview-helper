import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/blacklist.model.js ";

const authuser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  const isTokenBlackListed = await tokenBlacklistModel.findOne({token});
  if(isTokenBlackListed){
    return res.status(401).json({ message: "Token is invalid" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authuser;