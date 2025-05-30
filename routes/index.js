import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { 
    title: "Trajecta – Mapping Brilliance",
    url: req.url,
    canonical: "https://trajecta.org" + req.url,
    metaDescription: "Trajecta is the global hub where Olympiad medalists, founders and researchers share their real trajectories so you can build yours faster.",
    ogTitle: "Trajecta – Mapping Brilliance",
    ogImage: "https://trajecta.org/img/og-home.jpg"
  });
});

export default router;
