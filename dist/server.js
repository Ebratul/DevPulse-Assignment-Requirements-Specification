import app from "./app.js";
import configFile from "./config/env.js";
import { initDB } from "./db/index.js";
const main = async () => {
    try {
        await initDB();
        app.listen(configFile.port, () => {
            console.log(`Example app listening on port ${configFile.port}`);
        });
    }
    catch (error) {
        console.error("Server startup error:", error);
        process.exit(1);
    }
};
main();
//# sourceMappingURL=server.js.map