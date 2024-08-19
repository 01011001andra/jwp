// package
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

// path
const connectDB = require("./configs/db");
const auth_router = require("./routes/auth");
const buku_router = require("./routes/buku");
const peminjam_router = require("./routes/peminjam");

dotenv.config({ path: "./configs/.env" });

connectDB();

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// routes
app.get("/", (req, res) =>
  res.status(200).json({ message: "Selamat datang dibackend perpus!" })
);
app.use("/api/v1/auth", auth_router);
app.use("/api/v1/buku", buku_router);
app.use("/api/v1/peminjam", peminjam_router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in the ${process.env.NODE_ENV} mode.`
  );
});
