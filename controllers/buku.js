const Buku = require("../models/buku");

exports.create = async (req, res) => {
  const { nama, kategori, deskripsi } = req.body;

  try {
    const bookExist = await Buku.findOne({ nama });

    if (bookExist) {
      return res.status(400).json({ message: "buku sudah ada" });
    }

    const result = await Buku.create({ nama, kategori, deskripsi });
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
        { nama: { $regex: search, $options: "i" } }, // Pencarian berdasarkan judul kampanye (ignoring case)
        { kategori: { $regex: search, $options: "i" } }, // Pencarian berdasarkan kategori kampanye (ignoring case)
        { deskripsi: { $regex: search, $options: "i" } }, // Pencarian berdasarkan deskripsi kampanye (ignoring case)
        // Tambahkan kriteria pencarian lain di sini sesuai kebutuhan
      ],
    };

    // Mengambil data kampanye dari database dengan paginasi dan pencarian
    const buku = await Buku.find(searchCriteria)
      .sort({ createdAt: -1 })
      .skip(startIndex) // Mengabaikan data sebelum indeks awal
      .limit(limit); // Batasan jumlah data yang akan diambil

    // Menghitung jumlah total kampanye yang cocok dengan kriteria pencarian
    const totalBuku = await Buku.countDocuments(searchCriteria);

    // Menghitung total halaman berdasarkan jumlah data dan limit per halaman
    const totalPages = Math.ceil(totalBuku / limit);

    // Menambahkan informasi paginasi dan sisa hari ke respons
    const response = {
      success: true,
      message: "Berhasil mendapatkan data buku",
      currentPage: page,
      totalPages: totalPages,
      total: totalBuku,
      data: buku,
    };

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  const id = req.query.id;
  const { nama, kategori, deskripsi } = req.body;
  try {
    const result = await Buku.findByIdAndUpdate(
      id,
      { nama, kategori, deskripsi },
      { new: true }
    );
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await Buku.findByIdAndDelete(id);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
