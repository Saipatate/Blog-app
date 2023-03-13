import { config as configEnv } from "dotenv";
configEnv()

import * as express from "express"
import mongoose from "mongoose";
import * as cors from "cors";
const userRoutes = require("./routes/user");

// express app
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// routes
app.get("/", (req: express.Request ,res: express.Response) => {
    res.send("<html><style>html, body h1 {font-family: sans-serif;font-size: 1.5rem; text-align: center;}</style><h1>Web API</h1>")
})
app.use("/api/user", userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI!).then(() => {
    app.listen(process.env.PORT, () => {
        console.log("connect to db & listening on port http://localhost:" + process.env.PORT);
    })
}) 