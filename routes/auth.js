const express = require("express");
const { create, login, updatePassword, updateIndentifier } = require("../controllers/auth");
const { private, akses } = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .post(login)
  .put(private, akses("user", "admin"), updatePassword);

router.route("/register").post(create);
router.route("/identifier").put(updateIndentifier);

module.exports = router;
