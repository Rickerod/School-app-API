import express from "express"
import morgan from "morgan";
import mysql from "mysql"

import indexRoutes from "./routes/index.routes.js"

const app = express()

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/", indexRoutes);

//Seteos
app.set('json spaces', 2)

export default app;