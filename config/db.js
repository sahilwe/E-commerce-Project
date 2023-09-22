import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://alokbugalia:12345@cluster0.ib28buk.mongodb.net/E-commerce"
    );
    console.log(
      `Connected To mongodb Database ${conn.connection.host}`.bgYellow.white
    );
  } catch (error) {
    console.log(`Error in Mongodb ${error}`.bgBlack.white);
  }
};

export default connectDB;
