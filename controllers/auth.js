const Auth = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Peminjam = require("../models/peminjam");
const ObjectId = require("mongodb").ObjectId;

exports.create = async (req, res) => {
  const { email, password, username, role } = req.body;

  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ success: false, message: "semua kolom harus diisi" });
  }

  const salt = 10;
  const plainPassword = password;

  const hasedPassword = await bcrypt.hash(plainPassword, salt);
  const userExist = await Auth.findOne({ username });
  const emailExist = await Auth.findOne({ email });
  if (userExist) {
    return res
      .status(400)
      .json({ success: false, message: "username sudah ada" });
  }
  if (emailExist) {
    return res.status(400).json({ success: false, message: "email sudah ada" });
  }

  try {
    const result = await Auth.create({
      username,
      password: hasedPassword,
      email,
      role: role || "user",
    });
    return res.status(201).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username && !password) {
    return res
      .status(400)
      .json({ success: false, message: "username dan password harus diisi" });
  }

  try {
    const result = await Auth.findOne({ username });

    if (!result) {
      return res
        .status(400)
        .json({ success: false, message: "username tidak ditemukan" });
    }

    const comparedPassword = await bcrypt.compare(password, result.password);
    if (!comparedPassword) {
      return res
        .status(400)
        .json({ success: false, message: "password salah" });
    }

    const token = jwt.sign({ role: result.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      success: true,
      message: "Berhasil login",
      data: {
        id: result._id,
        username: result.username,
        email: result.email,
        role: result.role,
        token: token,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  const { oldPassword, newPassword, username } = req.body;

  if (!oldPassword && !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Semua filed harus diisi!" });
  }

  try {
    const result = await Auth.findOne({ username });

    if (!result) {
      return res
        .status(400)
        .json({ success: false, message: "username tidak ditemukan" });
    }

    const comparePassword = await bcrypt.compare(oldPassword, result.password);

    if (!comparePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password lama tidak sesuai!" });
    }
    const salt = 10;
    const plainPassword = newPassword;

    const hasedPassword = await bcrypt.hash(plainPassword, salt);

    const response = await Auth.findOneAndUpdate(
      { username },
      { password: hasedPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Berhasil mengganti password",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateIndentifier = async (req, res) => {
  const { id, username, email } = req.body;

  // Validasi ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format" });
  }

  try {
    // Mencari user berdasarkan ID
    const findUser = await Auth.findByIdAndUpdate(
      id,
      { username, email },
      { new: true }
    );

    if (!findUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    
    await Peminjam.updateMany({}, { $set: { username, email } });

    return res.status(200).json({
      success: true,
      message: "Success update identifier",
      data: findUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
