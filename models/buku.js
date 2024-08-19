const mongoose = require("mongoose");

const bukuModel = new mongoose.Schema(
  {
    nama: {
      type: String,
      unique: true,
      require: true,
    },
    kategori: {
      type: String,
      require: true,
    },
    deskripsi: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Book = mongoose.model("Buku", bukuModel);

module.exports = Book;
