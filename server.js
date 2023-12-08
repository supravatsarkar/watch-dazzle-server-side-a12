require("dotenv").config();
require("colors");
const app = require("./src/app");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

const connect = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri);
    console.log(`DB connected with URI:${mongoUri}`.bgGreen.bold);
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`.yellow);
    });
  } catch (error) {
    console.log("db connection error".bgRed, error);
  }
};
connect();
