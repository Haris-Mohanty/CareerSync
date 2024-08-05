import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated, Please Login...",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Auth Failed!",
        });
      } else {
        req.user = decode.userId;
        next();
      }
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Auth Failed!",
      error: err.message,
    });
  }
};
