import app from "./app.js";
import {PORT, DB_HOST, DB_USER, DB_PASSWORD} from "./config.js"

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
}) 