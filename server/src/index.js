const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({origin: process.env.CLIENT_URL || "http://localhost:5173"}));
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({status: "ok"});
});

app.listen(PORT, () => {
    console.log("server running on port " + PORT);
});