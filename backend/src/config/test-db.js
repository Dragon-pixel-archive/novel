import { db } from "./database.js";
import { sql } from "drizzle-orm";

async function testDatabase() {
    try {
        const result = await db.execute(sql`SELECT NOW()`);

        console.log("✅ Database connected!");
        console.log("🕐 Database time:", result[0].now);

        process.exit(0);
    } catch (error) {
        console.error("❌ Database connection failed!");
        console.error(error);

        process.exit(1);
    }
}

testDatabase();