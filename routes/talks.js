import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { rows } = await pool.query(
    `SELECT id, title, guest_name, video_url, published_at
     FROM talks ORDER BY published_at DESC`
  );
  res.render("talks", { 
    title: "Trajecta Talks", 
    url: req.url,
    canonical: "https://trajecta.org" + req.url,
    metaDescription: "Watch inspiring conversations with Olympiad medalists, founders and researchers as they share their trajectories to success.",
    ogTitle: "Trajecta Talks · Inspiring Conversations",
    ogImage: "https://trajecta.org/img/og-talks.jpg",
    talks: rows 
  });
});

export default router;