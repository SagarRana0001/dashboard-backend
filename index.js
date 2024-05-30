const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connection.js");
const userRoutes = require("./routes/userRoutes.js");
const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
app.use(cors());

connectDB(DATABASE_URL);

app.use(express.json());
app.use("/", userRoutes);
app.listen(port, () => {
  console.log(`server listing at http://localhost:${port}`);
});
