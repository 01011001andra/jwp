const jwt = require("jsonwebtoken");

exports.private = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Kamu harus login" });
  }

  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
// req.user
    if (!verifyToken) {
      return res
        .status(403)
        .json({ success: false, message: "JWT tidak valid" });
    }

    req.user = verifyToken;

    next();
  } catch (error) {
    if (error.message == "jwt expired") {
      return res.status(401).json({
        success: false,
        message: "Masa login berakhir, Silahkan login kembali!",
      });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.akses = (...role) => {
  return (req, res, next) => {
      if (!role.includes(req.user.role)) {
          return res
              .status(401)
              .json({ success: false, msg: "Anda tidak punya akses!" });
      }
      next();
  };
};
