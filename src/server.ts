import app from "./app";
import configFile from "./config/env";
import { initDB } from "./db";

const main = async () => {
  try {
      await initDB();
      app.listen(configFile.port, () => {
      console.log(`Example app listening on port ${configFile.port}`);
    });
  } catch (error) {
    console.error("Server startup error:", error); 
    process.exit(1);
  }
};

main();