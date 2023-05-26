import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import routeNotFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";
import jobsRouter from "./router/jobs.js";
import authRouter from "./router/auth.js";
import authenticateUser from "./middleware/authentication.js";
import "express-async-errors";

// Security packages
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";

dotenv.config();
import { rateLimit } from "express-rate-limit";

const app = express();
const PORT = process.env.PORT;
const URI = process.env.URI;

app.use(express.json());

app.use(helmet);
app.use(cors);
app.use(xss);

app.set("trust proxy", 1);
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(routeNotFoundMiddleware);

app.use(errorHandlerMiddleware);

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
