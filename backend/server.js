const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// Connect DB
connectDB();

app.use(cors({
    origin: ['https://todo-list-iota-swart.vercel.app', 'http://localhost:3000']
  }));
app.use(express.json());

app.use("/api/todos", require("./routes/todoRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
