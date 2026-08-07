import "dotenv/config";

export const env = {
    port: Number(process.env.PORT) || 3000,

    databaseUrl: process.env.DATABASE_URL,

    nodeEnv: process.env.NODE_ENV || "development",
};

if (!env.databaseUrl) {
    throw new Error("DATABASE_URL is missing in .env");
}