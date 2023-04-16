require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ImageRoutes = require("./routes/image.router");

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

app.get("/", (_, res) => {
  res.send("<h1>Server is Starting...</h1>");
});

app.use("/api", ImageRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server is listening on http://127.0.0.1:5000");
    });
  })
  .catch((error) => console.log(error.message));
