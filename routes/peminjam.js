const express = require("express");
const {
  create,
  findAll,
  update,
  findByUsername,
  setStatus,
  findAllStatus,
} = require("../controllers/peminjam");
const { akses, private } = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .post(private, akses("user"), create)
  .get(private, akses("admin"), findAll)
  .put(private, akses("user", "admin"), update)
  .patch(private, akses("user", "admin"), setStatus);
router.route("/user").get(private, akses("user"), findByUsername);
router.route("/admin").get(private, akses("admin"), findAllStatus);

module.exports = router;
