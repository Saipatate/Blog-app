import { config as configEnv } from "dotenv";
configEnv()

import * as express from "express"
import mongoose from "mongoose";
import * as cors from "cors";

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI!).then(() => {
    app.listen(process.env.PORT, () => {
        console.log("connect to db & listening on port http://localhost:" + process.env.PORT);
    })
})