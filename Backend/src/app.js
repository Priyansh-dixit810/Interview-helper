import express from 'express';

// Require all routes here
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import interviewRoute from './routes/interview.route.js';

const app = express();
const isProduction = process.env.PRODUCTION === "true" || process.env.NODE_ENV === "production";

app.use(express.json())
app.use(cookieParser());
if (isProduction) {
    app.set("trust proxy", 1);
}
app.use(cors({
    origin: isProduction ? process.env.FRONTEND_URL : "http://localhost:5173",
    credentials: true
}))

// using all routes here
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRoute);

export default app;
