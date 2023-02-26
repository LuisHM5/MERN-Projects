import express from "express";
import cors from "cors";
import morgan from "morgan";
import movies from "./v1/routes/movies.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/movies", movies);
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});
export default app;
