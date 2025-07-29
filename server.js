const express = require("express");
const dotenv = require("dotenv");
const postRouter = require("./routes/postRoute");
const connectDB = require("./config/db");
//load dotenv environment
dotenv.config();
connectDB();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/", postRouter);

app.listen(PORT, () => {
  console.log(`App is available at: http://localhost:${PORT}`);
});
