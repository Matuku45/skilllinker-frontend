const db = require("../config/db");

// UPLOAD RESUME
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { userId, description } = req.body;

    const [result] = await db.query(
      "INSERT INTO resumes (userId, fileName, mimeType, fileData, description) VALUES (?, ?, ?, ?, ?)",
      [
        userId,
        req.file.originalname,
        req.file.mimetype,
        req.file.buffer,
        description || "",
      ]
    );

    return res.status(201).json({
      message: "Resume uploaded successfully",
      resume: {
        id: result.insertId,
        fileName: req.file.originalname,
        mimeType: req.file.mimetype,
      },
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({ message: "Upload failed", error: err });
  }
};

// GET ALL RESUMES
exports.getAllResumes = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, userId, fileName, mimeType, description, createdAt FROM resumes"
    );
    res.json(rows);
  } catch (err) {
    console.error("RESUME LIST ERROR:", err);
    res.status(500).json({ message: "Failed to fetch resumes" });
  }
};

// GET ONE RESUME (DOWNLOAD)
exports.getResumeById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM resumes WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const file = rows[0];

    res.setHeader("Content-Type", file.mimeType);
    res.setHeader("Content-Disposition", `attachment; filename="${file.fileName}"`);
    res.send(file.fileData);

  } catch (err) {
    console.error("DOWNLOAD ERROR:", err);
    res.status(500).json({ message: "Failed to download resume" });
  }
};

// DELETE RESUME
exports.deleteResume = async (req, res) => {
  try {
    await db.query("DELETE FROM resumes WHERE id = ?", [req.params.id]);
    res.json({ message: "Resume deleted" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Failed to delete resume" });
  }
};
