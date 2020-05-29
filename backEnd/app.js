require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// mongoose connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch(console.log("Error in connecting to DB"));

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.get("/", (req, res) => res.send("Hi Bro!"));

// Starting a server
app.listen(PORT, () => {
  console.log(`Server started running at PORT: ${PORT}`);
});
