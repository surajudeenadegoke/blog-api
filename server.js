const express = require("express");
const postRouter = require("./routes/postRoute");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/", postRouter);

app.listen(PORT, () => {
  console.log(`App is available at: http://localhost:${PORT}`);
});
