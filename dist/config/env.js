import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path: path.join(process.cwd(), '.env')
});
const normalizePostgresUrl = (connectionString) => {
    const url = new URL(connectionString);
    const sslMode = url.searchParams.get("sslmode");
    if (sslMode === "require" || sslMode === "prefer" || sslMode === "verify-ca") {
        url.searchParams.set("sslmode", "verify-full");
    }
    return url.toString();
};
const connectionString = process.env.CONNECTIONSTRING;
if (!connectionString) {
    throw new Error("CONNECTIONSTRING is missing from .env");
}
const configFile = {
    connectionString: normalizePostgresUrl(connectionString),
    port: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET
};
export default configFile;
//# sourceMappingURL=env.js.map