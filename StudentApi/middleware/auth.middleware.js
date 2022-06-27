const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/constants");

const authMiddleware = async (req, res, next) => {
  const authourizedTokenHeader = req.headers["authorization"];

  if (!authourizedTokenHeader) {
    return res.status(401).json({
      success: false,
      code: 401,
      message:
        "Unauthorized access, missing authorization information in the request,try to provide information",
      data: null,
      error: null,
      resource: req.originalUrl,
    });
  }

  const [bearer, token] = authourizedTokenHeader.split(" ");

  if (!bearer || !token || (bearer && bearer !== "Bearer")) {
    return res.status(401).json({
      success: false,
      code: 401,
      message:
        "Unauthorized access, authorization information is not in a valid format",
      data: null,
      error: null,
      resource: req.originalUrl,
    });
  }

  try {
    const decodedUserId = await jwt.verify(token, JWT_SECRET);
    // console.log(token);
    // console.log(decodedUserId);
    res.locals.userId = decodedUserId.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      code: 401,
      message: "Unauthorized access from catch " + error.message,
      data: null,
      error: null,
      resource: req.originalUrl,
    });
  }
};

module.exports.authMiddleware = authMiddleware;
