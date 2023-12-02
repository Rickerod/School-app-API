import app from "./app.js";
import {PORT, DB_HOST, DB_USER, DB_PASSWORD} from "./config.js"

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Server listening on port ${DB_HOST}`);
    console.log(`Server listening on port ${DB_USER}`);
    console.log(`Server listening on port ${DB_PASSWORD}`);
}) 