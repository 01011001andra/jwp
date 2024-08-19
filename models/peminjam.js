const mongoose = require("mongoose");

const peminjamModel = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    nama_buku: {
      type: String,
      require: true,
    },
    kategori_buku: {
      type: String,
      require: true,
    },
    deskripsi_buku: {
      type: String,
    },
    pesan: {
      type: String,
    },
    status: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Peminjam = mongoose.model("Peminjam", peminjamModel);

module.exports = Peminjam;
