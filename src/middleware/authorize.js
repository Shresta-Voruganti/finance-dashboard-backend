module.exports = (roles) => {
  return (req, res, next) => {
    // If user not present
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check role
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};