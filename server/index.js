const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const messageRoute = require("./routes/messageRoutes");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection"))
  .catch((err) => console.log(err.message));

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on Post ${process.env.PORT}`);
});
