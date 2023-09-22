import express from "express"; // instead of require('express') we use this because we change type in packagejson
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoute from "./routes/productRoute.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import cors from "cors";
//rest env
const app = express();

//configure env
dotenv.config();

//database config
connectDB();

//middelwares
app.use(cors());
app.use(express.json()); //instead of bodyParser we use it so data is parse and is in readiable form for both operating system and applicant
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

const PORT = 5000; // here 8080 is use beacuse if in case there is some problem in env file then by deafault it tak 8080.

app.listen(PORT, () => {
  console.log(`server run on ${PORT}`.bgRed.white);
});
