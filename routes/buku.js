const express = require("express");
const { create, findAll, update, remove } = require("../controllers/buku");
const { private, akses } = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .post(private, akses("admin", "user"), create)
  .get(findAll)
  .put(private, akses("admin"), update)
  .delete(private, akses("admin"), remove);

module.exports = router;
