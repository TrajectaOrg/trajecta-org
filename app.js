import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import engine from 'ejs-locals';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// view engine
app.engine('ejs', engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static files
app.use(express.static(path.join(__dirname, "public")));

// routes
import indexRouter from "./routes/index.js";
import alumniRouter from "./routes/alumni.js";
import talksRouter from "./routes/talks.js";

app.use("/", indexRouter);
app.use("/alumni", alumniRouter);
app.use("/talks", talksRouter);

// 404
app.use((req, res) => {
  res.status(404).render("404", { 
    title: "Not found",
    url: req.url,
    canonical: "https://trajecta.org" + req.url,
    metaDescription: "The page you're looking for could not be found on Trajecta.",
    ogTitle: "Page Not Found · Trajecta",
    ogImage: "https://trajecta.org/img/og-default.jpg"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Trajecta running on http://localhost:${PORT}`));
