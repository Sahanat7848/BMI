import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const url = 'libsql://bmi-sahanat7848.aws-ap-northeast-1.turso.io';
const authToken = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Njg4MjA1OTAsImlkIjoiY2U0OGUxYzMtMGMxMC00Zjk4LWFhY2YtN2I2ZDU2OGRlYjI2IiwicmlkIjoiNmQwMDdkNjctMjIwMi00ZmZhLTk1ZDctNjY0MmEzM2FlNDAwIn0.Ma-FzssRHDPLhqki3Qw4jNJbl9CPlMhtiBLqufC1vJE6yBh_-UjuOPGnCXbfeaFABxF9hfUhcrljjek_AsU_Bw';

const adapter = new PrismaLibSql({ url, authToken });
const prisma = new PrismaClient({ adapter });

async function seedTurso() {
    console.log("Fetching users from Turso...");
    const users = await prisma.user.findMany();

    if (users.length === 0) {
        console.log("No users found in Turso database. Please register an account first.");
        return;
    }

    console.log(`Found ${users.length} users. Seeding 50 records for each...`);
    const now = new Date();

    for (const user of users) {
        // Check if user already has records to avoid duplicates
        const existingCount = await prisma.bMIRecord.count({ where: { userId: user.id } });
        if (existingCount > 0) {
            console.log(`User ${user.email} already has ${existingCount} records. Skipping.`);
            continue;
        }

        const records = [];
        for (let i = 0; i < 50; i++) {
            const recordedAt = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const height = 170 + Math.random() * 10;
            const weight = 60 + Math.random() * 20;
            const bmi = weight / ((height / 100) ** 2);

            let category = "Normal";
            if (bmi < 18.5) category = "Underweight";
            else if (bmi < 25) category = "Normal";
            else if (bmi < 30) category = "Overweight";
            else category = "Obese";

            records.push({
                userId: user.id,
                weight,
                height,
                bmi,
                category,
                recordedAt,
            });
        }

        await prisma.bMIRecord.createMany({ data: records });
        console.log(`Seeded 50 records for user: ${user.email}`);
    }

    console.log("Turso seeding complete!");
}

seedTurso()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
