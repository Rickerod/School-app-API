import express from "express"
import morgan from "morgan";

import indexRoutes from "./routes/index.routes.js"
import usersRoutes from "./routes/users.routes.js"
import postsRoutes from "./routes/posts.routes.js"
import commentsRoutes from "./routes/comments.routes.js"
import reportsRoutes from "./routes/reports.routes.js"
import imagesRoutes from "./routes/images.routes.js"
import likesRoutes from "./routes/likes.routes.js"
import BitacoraRoutes from "./routes/bitacora.routes.js"
import disableComments from "./routes/disableComments.routes.js";

const app = express()

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/", indexRoutes);
app.use("/users", usersRoutes )
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);
app.use("/disableComments", disableComments);
app.use("/report", reportsRoutes);
app.use("/upload", imagesRoutes);
app.use("/like", likesRoutes);
app.use("/bitacora", BitacoraRoutes)

//Seteos
app.set('json spaces', 2)

export default app;