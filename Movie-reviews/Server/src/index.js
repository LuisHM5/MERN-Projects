import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import MoviesDAO from "./v1/DAO/MoviesDAO.js";
async function main() {
  dotenv.config();
  const port = process.env.PORT || 8000;
  try {
    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);

    // Connect to the MongoDB cluster
    await client.connect();
    await MoviesDAO.injectDB(client);
    const db = client.db(process.env.MOVIEREVIEWS_NS);

    console.log("Connected successfully to database: " + db.databaseName);

    app.listen(port, () => {
      console.log("Server is running 🚀:");
      console.log("\x1b[33m%s\x1b[0m", "http://localhost:" + port);
    });
  } catch (e) {
    console.error(e);
  }
}
main().catch(console.error);
