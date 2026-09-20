// import express from "express";
// import cookieParser from "cookie-parser";
// import authRouter from "./routes/auth.routes.js";
// import chatRouter from "./routes/chat.routes.js";

// import morgan from "morgan";
// import cors from "cors";

// import path from "path";



// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "..", "public")))
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(morgan("dev"));
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: [ "GET", "POST", "PUT", "DELETE" ],
// }))

// // Health check
// app.get("/", (req, res) => {
//     res.json({ message: "Server is running" });
// });


// app.use("/api/auth", authRouter);
// app.use("/api/chats", chatRouter);


// // response to api that is not created by the user(wild card api )
// app.use('*name', (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "public", "index.html"));
// });

// export default app;



import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";

import morgan from "morgan";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

// __dirname setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());

app.use(
    express.static(path.join(__dirname, "..", "public"))
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

// Health check
app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

// API routes
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

// Wildcard route for React frontend
app.use((req, res) => {
    res.sendFile(
        path.join(__dirname, "..", "public", "index.html")
    );
});

export default app;