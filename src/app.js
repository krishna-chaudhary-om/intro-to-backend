import express from "express";

import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API is running" });
});

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// example: http://localhost:4000/api/v1/users/register

// 404 for unknown routes
app.use((req, res) => {
    res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// global error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || "Server error" });
});

export default app;
