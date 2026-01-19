import { createClient } from '@libsql/client';
import fs from 'fs';
import path from 'path';

const url = 'libsql://bmi-sahanat7848.aws-ap-northeast-1.turso.io';
const authToken = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Njg4MjA1OTAsImlkIjoiY2U0OGUxYzMtMGMxMC00Zjk4LWFhY2YtN2I2ZDU2OGRlYjI2IiwicmlkIjoiNmQwMDdkNjctMjIwMi00ZmZhLTk1ZDctNjY0MmEzM2FlNDAwIn0.Ma-FzssRHDPLhqki3Qw4jNJbl9CPlMhtiBLqufC1vJE6yBh_-UjuOPGnCXbfeaFABxF9hfUhcrljjek_AsU_Bw';

async function push() {
    const client = createClient({ url, authToken });

    console.log("Creating tables on Turso...");

    const sql = `
        CREATE TABLE IF NOT EXISTS "User" (
            "id" TEXT NOT NULL PRIMARY KEY,
            "email" TEXT,
            "emailVerified" DATETIME,
            "image" TEXT,
            "name" TEXT,
            "password" TEXT,
            "role" TEXT NOT NULL DEFAULT 'USER',
            "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" DATETIME NOT NULL
        );
        CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

        CREATE TABLE IF NOT EXISTS "Account" (
            "id" TEXT NOT NULL PRIMARY KEY,
            "userId" TEXT NOT NULL,
            "type" TEXT NOT NULL,
            "provider" TEXT NOT NULL,
            "providerAccountId" TEXT NOT NULL,
            "refresh_token" TEXT,
            "access_token" TEXT,
            "expires_at" INTEGER,
            "token_type" TEXT,
            "scope" TEXT,
            "id_token" TEXT,
            "session_state" TEXT,
            CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
        );
        CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

        CREATE TABLE IF NOT EXISTS "Session" (
            "id" TEXT NOT NULL PRIMARY KEY,
            "sessionToken" TEXT NOT NULL,
            "userId" TEXT NOT NULL,
            "expires" DATETIME NOT NULL,
            CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
        );
        CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "Session"("sessionToken");

        CREATE TABLE IF NOT EXISTS "BMIRecord" (
            "id" TEXT NOT NULL PRIMARY KEY,
            "userId" TEXT NOT NULL,
            "weight" REAL NOT NULL,
            "height" REAL NOT NULL,
            "bmi" REAL NOT NULL,
            "category" TEXT NOT NULL,
            "recordedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT "BMIRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
        );
    `;

    const statements = sql.split(';').filter(s => s.trim() !== '');

    for (const statement of statements) {
        try {
            await client.execute(statement);
            console.log("Executed successfully:", statement.trim().substring(0, 50) + "...");
        } catch (e) {
            console.log("Skipped or Error:", e.message);
        }
    }

    console.log("Done!");
}

push();
