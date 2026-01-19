import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany();

    if (users.length === 0) {
        console.log("No users found.");
        return;
    }

    const now = new Date();
    console.log(`Force seeding records for ${users.length} users including TODAY...`);

    for (const user of users) {
        const records = [];
        for (let i = 0; i < 50; i++) {
            // Ensure the first record is exactly NOW
            const recordedAt = i === 0 ? new Date() : new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const height = 170 + Math.random() * 10;
            const weight = 60 + Math.random() * 20;
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);

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

        await prisma.bMIRecord.createMany({
            data: records,
        });
    }

    console.log("Seeding complete. Please refresh the page.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
