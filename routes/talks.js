import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { rows } = await pool.query(
    `SELECT id, title, guest_name, video_url, published_at
     FROM talks ORDER BY published_at DESC`
  );
  res.render("talks", { title: "Trajecta Talks", talks: rows });
});

export default router;