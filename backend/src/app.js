import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import novelRouter from "./routes/novel.route.js"
import tagRouter from "./routes/tags.route.js"
import adminRouter from "./routes/admin.routes.js"
import { upload } from "./middlewares/uploadCover.middleware.js";
import { PostCoverControl } from "./controllers/uploadCover.controller.js";

const app = express();

// ====================
// Middleware
// ====================

app.use(helmet());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());

app.use(express.urlencoded({
    extended: true,
}));

app.use(morgan("dev"));

// ====================
// Health check
// ====================

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "LearnVocab API is running 🚀",
    });
});


// ====================
// Router API
// ====================

app.use("/api/novels", novelRouter);
app.use("/api/tags", tagRouter);
app.use("/api/admin", adminRouter);
app.post("/api/upload/:id", 
    upload.single("cover"),
    PostCoverControl
)

// ====================
// 404
// ====================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

// ====================
// Error handler
// ====================

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error",
    });
});

export default app;