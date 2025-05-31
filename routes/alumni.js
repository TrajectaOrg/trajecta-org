import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { olympiad, country, page = 1 } = req.query;   // e.g. ?olympiad=IMO&country=USA&page=2
  const limit = 200;
  const offset = (page - 1) * limit;
  
  let query = `
    SELECT id, name, surname, country, medal, year, olympiad
    FROM alumni
    WHERE ($1::text IS NULL OR olympiad = $1)
      AND ($2::text IS NULL OR country = $2)
    ORDER BY year DESC
    LIMIT $3 OFFSET $4;
  `;
  
  // Get one extra row to check if there are more pages
  const { rows } = await pool.query(query, [olympiad || null, country || null, limit + 1, offset]);
  
  const hasMore = rows.length > limit;
  const alumni = hasMore ? rows.slice(0, limit) : rows;
  
  // Helper function to build pagination URLs
  const buildPageURL = (pageNum) => {
    const params = new URLSearchParams(req.query);
    params.set('page', pageNum);
    return '?' + params.toString();
  };
  
  res.render("alumni", { 
    title: "Alumni", 
    url: req.url,
    canonical: "https://trajecta.org" + req.url,
    metaDescription: "Browse through our extensive database of Olympiad medalists, founders and researchers from around the world.",
    ogTitle: "Alumni Directory · Trajecta",
    ogImage: "https://trajecta.org/img/og-alumni.jpg",
    alumni: alumni, 
    query: req.query, 
    page: parseInt(page), 
    hasMore: hasMore,
    prevPageURL: parseInt(page) > 1 ? buildPageURL(parseInt(page) - 1) : null,
    nextPageURL: hasMore ? buildPageURL(parseInt(page) + 1) : null
  });
});

// individual profile
router.get("/:id", async (req, res) => {
  const { rows } = await pool.query(
    `SELECT * FROM alumni WHERE id = $1`,
    [req.params.id]
  );
  if (rows.length === 0) return res.redirect("/alumni");
  res.render("alumnus", { 
    title: rows[0].name + " " + rows[0].surname, 
    url: req.url,
    canonical: "https://trajecta.org" + req.url,
    metaDescription: `Learn about ${rows[0].name}${rows[0].surname ? ' ' + rows[0].surname : ''}, ${rows[0].olympiad} medalist from ${rows[0].country}. Discover their trajectory and achievements.`,
    ogTitle: `${rows[0].name} ${rows[0].surname} · ${rows[0].olympiad} Medalist`,
    ogImage: "https://trajecta.org/img/og-default.jpg",
    alumnus: rows[0] 
  });
});

export default router;
