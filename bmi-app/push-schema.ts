import { createClient } from "@libsql/client";
import fs from "fs";

const url = 'libsql://bmi-sahanat7848.aws-ap-northeast-1.turso.io';
const authToken = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Njg4MjA1OTAsImlkIjoiY2U0OGUxYzMtMGMxMC00Zjk4LWFhY2YtN2I2ZDU2OGRlYjI2IiwicmlkIjoiNmQwMDdkNjctMjIwMi00ZmZhLTk1ZDctNjY0MmEzM2FlNDAwIn0.Ma-FzssRHDPLhqki3Qw4jNJbl9CPlMhtiBLqufC1vJE6yBh_-UjuOPGnCXbfeaFABxF9hfUhcrljjek_AsU_Bw';

async function pushSchema() {
    const client = createClient({ url, authToken });
    const sql = fs.readFileSync("schema.sql", "utf-8");

    console.log("Pushing schema to Turso...");

    // Split SQL into separate statements because execute() might not support multiple statements in one call
    // depending on the driver version
    const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

    for (const statement of statements) {
        try {
            await client.execute(statement);
        } catch (e) {
            console.error(`Error executing statement: ${statement}`);
            console.error(e);
        }
    }

    console.log("Schema push complete!");
}

pushSchema().catch(console.error);
