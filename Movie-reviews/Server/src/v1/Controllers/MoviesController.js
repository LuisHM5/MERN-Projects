import MoviesDAO from "../DAO/MoviesDAO.js";

export default class MoviesController {
  static async apiGetMovies(req, res, next) {
    const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20;

    // Math max validate numbers>=0
    const page = req.query.page ? Math.max(parseInt(req.query.page) - 1, 0) : 0;

    let filters = {};
    if (req.query.rated) {
      filters.rated = req.query.rated;
    } else if (req.query.title) {
      filters.title = req.query.title;
    }
    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({ filters, page, moviesPerPage });
    let response = {
      movies: moviesList,
      page: page,
      filters: filters,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies,
    };
    res.json(response);
  }
}
