import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import notFound from "./middleware/not-found.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const URI = process.env.URI;

app.use(express.json());

app.use("api/v1/jobs", (req, res) => res.json({ message: "success" }));

app.use(notFound);

const startConnection = async () => {
  try {
    await connectDB(URI);
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

startConnection();
