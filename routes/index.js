import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Trajecta – Mapping Brilliance" });
});

export default router;
