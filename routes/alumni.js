import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { olympiad, country } = req.query;   // e.g. ?olympiad=IMO&country=USA
  let query = `
    SELECT id, name, country, medal, year, olympiad
    FROM alumni
    WHERE ($1::text IS NULL OR olympiad = $1)
      AND ($2::text IS NULL OR country = $2)
    ORDER BY year DESC
    LIMIT 200;
  `;
  const { rows } = await pool.query(query, [olympiad || null, country || null]);
  res.render("alumni", { title: "Alumni", alumni: rows });
});

// individual profile
router.get("/:id", async (req, res) => {
  const { rows } = await pool.query(
    `SELECT * FROM alumni WHERE id = $1`,
    [req.params.id]
  );
  if (rows.length === 0) return res.redirect("/alumni");
  res.render("alumnus", { title: rows[0].name, alumnus: rows[0] });
});

export default router;
