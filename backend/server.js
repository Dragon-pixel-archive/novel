import app from "./src/app.js";
import { env } from "./src/config/env.js";

app.listen(env.port, () => {
    console.log(`
╔══════════════════════════════════════╗
║          LEARNVOCAB BACKEND          ║
╠══════════════════════════════════════╣
║ Server: http://localhost:${env.port}       ║
║ API:    http://localhost:${env.port}/api   ║
║ Env:    ${env.nodeEnv}                 ║
╚══════════════════════════════════════╝
    `);
});