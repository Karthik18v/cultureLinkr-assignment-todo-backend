const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/TaskRoutes");

const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const mongoUrl =
  "mongodb+srv://bittukarthik77:QZv3OONMho8vV5py@cluster0.jpujq.mongodb.net/";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.use("/task",taskRoutes);
app.listen(PORT, () =>
  console.log(`Server Running At http://localhost:${PORT}`)
);

module.exports = app;
