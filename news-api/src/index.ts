import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import data from "./data";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());

app.get("/api", function (req, res) {
  res.json({
    economy: data.economy,
    technology: data.technology,
    world: data.world,
  });
});

app.get("/api/:subject", function (req, res) {
  const { subject } = req.params;

  switch (subject) {
    case "economy":
      res.json(data.economy);
      break;
    case "technology":
      res.json(data.technology);
      break;
    case "world":
      res.json(data.world);
      break;
  }
});

app.get("/api/:subject/:id", function (req, res) {
  const { subject, id } = req.params;

  let allNews = null;

  switch (subject) {
    case "economy":
      allNews = data.economy;
      break;

    case "technology":
      allNews = data.technology;
      break;
    case "world":
      allNews = data.world;
      break;
  }

  const news = allNews?.value.find((news) => news.id === id);

  res.json(news);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
