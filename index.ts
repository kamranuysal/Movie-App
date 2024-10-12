import express, { Request, Response } from "express";
import { connect, getCollection } from "./db.ts";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { IMovie } from "./interfaces.ts";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;
connect();

app.get("/api/home-slider", (req: Request, res: Response): void => {
  const movieCollection = getCollection<IMovie>("homeSlider");
  movieCollection
    .find()
    .toArray()
    .then((movies) => {
      res.json(movies);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to fetch movies" });
    });
});

app.get("/api/top-picks", (req: Request, res: Response): void => {
  const movieCollection = getCollection<IMovie>("topPicks");
  movieCollection
    .find()
    .toArray()
    .then((movies) => {
      res.json(movies);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to fetch movies" });
    });
});

app.get("/api/trending", (req: Request, res: Response): void => {
  const movieCollection = getCollection<IMovie>("trending");
  movieCollection
    .find()
    .toArray()
    .then((movies) => {
      res.json(movies);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to fetch movies" });
    });
});

app.get("/api/popular", (req: Request, res: Response): void => {
  const movieCollection = getCollection<IMovie>("popular");
  movieCollection
    .find()
    .toArray()
    .then((movies) => {
      res.json(movies);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to fetch movies" });
    });
});

app.get("/api/recommended", (req: Request, res: Response): void => {
  const movieCollection = getCollection<IMovie>("recommended");
  movieCollection
    .find()
    .toArray()
    .then((movies) => {
      res.json(movies);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to fetch movies" });
    });
});

app.get("/api/suggested", (req: Request, res: Response): void => {
  const movieCollection = getCollection<IMovie>("suggested");
  movieCollection
    .find()
    .toArray()
    .then((movies) => {
      res.json(movies);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to fetch movies" });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
