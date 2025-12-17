require("dotenv").config(); // MUST be at top

const connectToMongo = require("./Database/db");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const fs = require("fs");

// 🔹 Connect MongoDB
connectToMongo();

// 🔹 Port (Render provides PORT automatically)
const port = process.env.PORT || 4000;

// 🔹 TEMPORARY OPEN CORS (OK for now)
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// 🔹 CREATE media FOLDER IF NOT EXISTS (🔥 FIX)
const mediaPath = path.join(__dirname, "media");

if (!fs.existsSync(mediaPath)) {
  fs.mkdirSync(mediaPath);
}

// 🔹 Serve media files
app.use("/media", express.static(mediaPath));

// 🔹 Health check
app.get("/", (req, res) => {
  res.send("Hello 👋 Backend is Working Fine 🚀");
});

// 🔹 Routes
app.use("/api/admin", require("./routes/details/admin-details.route"));
app.use("/api/faculty", require("./routes/details/faculty-details.route"));
app.use("/api/student", require("./routes/details/student-details.route"));

app.use("/api/branch", require("./routes/branch.route"));
app.use("/api/subject", require("./routes/subject.route"));
app.use("/api/notice", require("./routes/notice.route"));
app.use("/api/timetable", require("./routes/timetable.route"));
app.use("/api/material", require("./routes/material.route"));
app.use("/api/exam", require("./routes/exam.route"));
app.use("/api/marks", require("./routes/marks.route"));

// 🔹 Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
