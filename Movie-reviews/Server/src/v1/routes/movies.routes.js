import { Router } from "express";
import MoviesController from "../Controllers/MoviesController.js";
const router = Router();

router.get("/", MoviesController.apiGetMovies);

export default router;
