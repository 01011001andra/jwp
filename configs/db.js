const mongoose = require("mongoose");

async function connectDB() {
  try {
    const conn = await mongoose.connect(`${process.env.URI}`, {
      dbName: `${process.env.MONGODB_NAME}`,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;
// 38pA01yUvuTKobfE
