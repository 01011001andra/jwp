const mongoose = require("mongoose");

const authModel = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    role: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Middleware untuk menangani duplicate key error saat save
authModel.post("save", function (error, doc, next) {
  handleDuplicateKeyError(error, next);
});

// Middleware untuk menangani duplicate key error saat update
authModel.post("findOneAndUpdate", function (error, doc, next) {
  handleDuplicateKeyError(error, next);
});

// Fungsi untuk menangani duplicate key error
function handleDuplicateKeyError(error, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    const value = error.keyValue[field];
    const errorMessage = `${
      field.charAt(0).toUpperCase() + field.slice(1)
    } "${value}" sudah digunakan. Silahkan buat ${field} lain.`;
    next(new Error(errorMessage));
  } else {
    next(error);
  }
}

const Auth = mongoose.model("Auth", authModel);

module.exports = Auth;
