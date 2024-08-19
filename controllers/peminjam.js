const Auth = require("../models/auth");
const Peminjam = require("../models/peminjam");

exports.create = async (req, res) => {
  const { username, email, nama_buku, kategori_buku, deskripsi_buku, status } =
    req.body;

  try {
    const pinjamExist = await Peminjam.find({ username, nama_buku });
    // return res.status(400).json({
    //   success: false,
    //   message: pinjamExist.map((item) => item.status).includes("pending"),
    // });
    if (pinjamExist.map((item) => item.status).includes("pending")) {
      return res.status(400).json({
        success: false,
        message: `Buku sudah ada, status pinjam: pending`,
      });
    }
    if (pinjamExist.map((item) => item.status).includes("approved")) {
      return res.status(400).json({
        success: false,
        message: `Buku sudah ada, status pinjam: approved`,
      });
    }

    const result = await Peminjam.create({
      username,
      email,
      nama_buku,
      kategori_buku,
      deskripsi_buku,
      status: "pending",
    });
    return res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  // Mendapatkan parameter paginasi dari permintaan HTTP
  const page = parseInt(req.query.page) || 1; // Nomor halaman (default: 1)
  const limit = parseInt(req.query.limit) || 10; // Jumlah data per halaman (default: 10)

  // Mendapatkan parameter pencarian dari permintaan HTTP
  const search = req.query.search || ""; // Kata kunci pencarian (default: '')

  try {
    // Menghitung indeks data awal dan akhir untuk halaman saat ini
    const startIndex = (page - 1) * limit;

    // Membuat query pencarian MongoDB
    const searchCriteria = {
      $or: [
        { username: { $regex: search, $options: "i" } }, // Pencarian berdasarkan judul kampanye (ignoring case)
        { email: { $regex: search, $options: "i" } }, // Pencarian berdasarkan judul kampanye (ignoring case)
        { nama_buku: { $regex: search, $options: "i" } }, // Pencarian berdasarkan judul kampanye (ignoring case)
        { kategori: { $regex: search, $options: "i" } }, // Pencarian berdasarkan kategori kampanye (ignoring case)
        // Tambahkan kriteria pencarian lain di sini sesuai kebutuhan
      ],
    };

    // Mengambil data kampanye dari database dengan paginasi dan pencarian
    const peminjam = await Peminjam.find(searchCriteria)
      .where({ status: "pending" })
      .skip(startIndex) // Mengabaikan data sebelum indeks awal
      .limit(limit); // Batasan jumlah data yang akan diambil

    // Menghitung jumlah total kampanye yang cocok dengan kriteria pencarian
    const totalPeminjam = await Peminjam.countDocuments(searchCriteria).where({
      status: "pending",
    });

    // Menghitung total halaman berdasarkan jumlah data dan limit per halaman
    const totalPages = Math.ceil(totalPeminjam / limit);

    // Menambahkan informasi paginasi dan sisa hari ke respons
    const response = {
      success: true,
      message: "Berhasil mendapatkan data peminjam",
      currentPage: page,
      totalPages: totalPages,
      total: totalPeminjam,
      data: peminjam,
    };

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findByUsername = async (req, res) => {
  // Mendapatkan parameter paginasi dari permintaan HTTP
  const page = parseInt(req.query.page) || 1; // Nomor halaman (default: 1)
  const limit = parseInt(req.query.limit) || 10; // Jumlah data per halaman (default: 10)
  const username = req.query.username;
  const status = req.query.status;

  // Mendapatkan parameter pencarian dari permintaan HTTP
  const search = req.query.search || ""; // Kata kunci pencarian (default: '')

  try {
    // Menghitung indeks data awal dan akhir untuk halaman saat ini
    const startIndex = (page - 1) * limit;

    // Membuat query pencarian MongoDB
    const searchCriteria = {
      $or: [
        { nama_buku: { $regex: search, $options: "i" } }, // Pencarian berdasarkan judul kampanye (ignoring case)
        { kategori_buku: { $regex: search, $options: "i" } }, // Pencarian berdasarkan kategori kampanye (ignoring case)
        { deskripsi_buku: { $regex: search, $options: "i" } }, // Pencarian berdasarkan deskripsi kampanye (ignoring case)
        // Tambahkan kriteria pencarian lain di sini sesuai kebutuhan
      ],
    };

    const peminjamList = [];
    let totalPeminjam = 0;

    if (status === "") {
      // Mengambil data kampanye dari database dengan paginasi dan pencarian
      const peminjam = await Peminjam.find(searchCriteria)
        .where({ username, status: { $ne: "returned" } })
        .sort({ createdAt: -1 })
        .skip(startIndex) // Mengabaikan data sebelum indeks awal
        .limit(limit); // Batasan jumlah data yang akan diambil
      peminjamList.push(...peminjam);

      // Menghitung jumlah total kampanye yang cocok dengan kriteria pencarian
      const total = await Peminjam.countDocuments(searchCriteria).where({
        username,
        status: { $ne: "returned" },
      });
      totalPeminjam = total;
    }
    if (status === "pending") {
      const peminjam = await Peminjam.find(searchCriteria)
        .where({ username, status: "pending" })
        .sort({ createdAt: -1 })
        .skip(startIndex) // Mengabaikan data sebelum indeks awal
        .limit(limit); // Batasan jumlah data yang akan diambil

      peminjamList.push(...peminjam);
      const total = await Peminjam.countDocuments(searchCriteria).where({
        username,
        status: "pending",
      });
      totalPeminjam = total;
    }
    if (status === "rejected") {
      const peminjam = await Peminjam.find(searchCriteria)

        .where({ username, status: "rejected" })
        .sort({ createdAt: -1 })
        .skip(startIndex) // Mengabaikan data sebelum indeks awal
        .limit(limit); // Batasan jumlah data yang akan diambil

      peminjamList.push(...peminjam);
      const total = await Peminjam.countDocuments(searchCriteria).where({
        username,
        status: "rejected",
      });
      totalPeminjam = total;
    }
    if (status === "approved") {
      const peminjam = await Peminjam.find(searchCriteria)
        .where({ username, status: "approved" })
        .sort({ createdAt: -1 })
        .skip(startIndex) // Mengabaikan data sebelum indeks awal
        .limit(limit); // Batasan jumlah data yang akan diambil

      peminjamList.push(...peminjam);
      const total = await Peminjam.countDocuments(searchCriteria).where({
        username,
        status: "approved",
      });
      totalPeminjam = total;
    }
    if (status === "returned") {
      // Mengambil data kampanye dari database dengan paginasi dan pencarian
      const peminjam = await Peminjam.find(searchCriteria)
        .where({ username, status: "returned" })
        .sort({ createdAt: -1 })
        .skip(startIndex) // Mengabaikan data sebelum indeks awal
        .limit(limit); // Batasan jumlah data yang akan diambil
      peminjamList.push(...peminjam);

      // Menghitung jumlah total kampanye yang cocok dengan kriteria pencarian
      const total = await Peminjam.countDocuments(searchCriteria).where({
        username,
        status: "returned",
      });
      totalPeminjam = total;
    }

    // return res.status(400).json({
    //   success: false,
    //   message: { peminjamList: peminjamList, totalPeminjam: totalPeminjam },
    // });

    // Menghitung total halaman berdasarkan jumlah data dan limit per halaman
    const totalPages = Math.ceil(totalPeminjam / limit);

    // Menambahkan informasi paginasi dan sisa hari ke respons
    const response = {
      success: true,
      message: "Berhasil mendapatkan data peminjam",
      currentPage: page,
      totalPages: totalPages,
      total: totalPeminjam,
      data: peminjamList,
    };

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.findAllStatus = async (req, res) => {
  // Mendapatkan parameter paginasi dari permintaan HTTP
  const page = parseInt(req.query.page) || 1; // Nomor halaman (default: 1)
  const limit = parseInt(req.query.limit) || 10; // Jumlah data per halaman (default: 10)
  const username = req.query.username;
  const status = req.query.status;

  // Mendapatkan parameter pencarian dari permintaan HTTP
  const search = req.query.search || ""; // Kata kunci pencarian (default: '')

  try {
    // Menghitung indeks data awal dan akhir untuk halaman saat ini
    const startIndex = (page - 1) * limit;

    // Membuat query pencarian MongoDB
    const searchCriteria = {
      $or: [
        { nama_buku: { $regex: search, $options: "i" } }, // Pencarian berdasarkan judul kampanye (ignoring case)
        { kategori_buku: { $regex: search, $options: "i" } }, // Pencarian berdasarkan kategori kampanye (ignoring case)
        { deskripsi_buku: { $regex: search, $options: "i" } }, // Pencarian berdasarkan deskripsi kampanye (ignoring case)
        // Tambahkan kriteria pencarian lain di sini sesuai kebutuhan
      ],
    };

    const peminjamList = [];
    let totalPeminjam = 0;

    if (status === "") {
      // Mengambil data kampanye dari database dengan paginasi dan pencarian
      const peminjam = await Peminjam.find(searchCriteria)
        .sort({ updatedAt: -1 })
        .skip(startIndex) // Mengabaikan data sebelum indeks awal
        .limit(limit); // Batasan jumlah data yang akan diambil
      peminjamList.push(...peminjam);

      // Menghitung jumlah total kampanye yang cocok dengan kriteria pencarian
      const total = await Peminjam.countDocuments(searchCriteria);
      totalPeminjam = total;
    }
    if (status === "pending") {
      const peminjam = await Peminjam.find(searchCriteria)
        .where({ status })
        .sort({ updatedAt: -1 })
        .skip(startIndex) // Mengabaikan data sebelum indeks awal
        .limit(limit); // Batasan jumlah data yang akan diambil

      peminjamList.push(...peminjam);
      const total = await Peminjam.countDocuments(searchCriteria).where({
        status,
      });
      totalPeminjam = total;
    }
    if (status === "rejected") {
      const peminjam = await Peminjam.find(searchCriteria)
        .where({ status })
        .sort({ updatedAt: -1 })
        .skip(startIndex) // Mengabaikan data sebelum indeks awal
        .limit(limit); // Batasan jumlah data yang akan diambil

      peminjamList.push(...peminjam);
      const total = await Peminjam.countDocuments(searchCriteria).where({
        status,
      });
      totalPeminjam = total;
    }
    if (status === "approved") {
      const peminjam = await Peminjam.find(searchCriteria)
        .where({ status })
        .sort({ updatedAt: -1 })
        .skip(startIndex) // Mengabaikan data sebelum indeks awal
        .limit(limit); // Batasan jumlah data yang akan diambil

      peminjamList.push(...peminjam);
      const total = await Peminjam.countDocuments(searchCriteria).where({
        status,
      });
      totalPeminjam = total;
    }
    if (status === "returned") {
      // Mengambil data kampanye dari database dengan paginasi dan pencarian
      const peminjam = await Peminjam.find(searchCriteria)
        .where({ status })
        .sort({ updatedAt: -1 })
        .skip(startIndex) // Mengabaikan data sebelum indeks awal
        .limit(limit); // Batasan jumlah data yang akan diambil
      peminjamList.push(...peminjam);

      // Menghitung jumlah total kampanye yang cocok dengan kriteria pencarian
      const total = await Peminjam.countDocuments(searchCriteria).where({
        status,
      });
      totalPeminjam = total;
    }

    // return res.status(400).json({
    //   success: false,
    //   message: { peminjamList: peminjamList, totalPeminjam: totalPeminjam },
    // });

    // Menghitung total halaman berdasarkan jumlah data dan limit per halaman
    const totalPages = Math.ceil(totalPeminjam / limit);

    // Menambahkan informasi paginasi dan sisa hari ke respons
    const response = {
      success: true,
      message: "Berhasil mendapatkan data peminjam",
      currentPage: page,
      totalPages: totalPages,
      total: totalPeminjam,
      data: peminjamList,
    };

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  const id = req.query.id;
  const { status } = req.body;
  try {
    const result = await Peminjam.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.setStatus = async (req, res) => {
  const id = req.query.id;
  const { pesan, status } = req.body;
  try {
    const result = await Peminjam.findByIdAndUpdate(
      id,
      { pesan, status },
      { new: true }
    );
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
