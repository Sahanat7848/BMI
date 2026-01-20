import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
    // Create default user
    const email = 'dekdee@test.com';
    const password = await bcrypt.hash('dekdee123', 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: password
        },
        create: {
            email,
            name: 'DekDee',
            password,
        },
    });

    console.log(`Created/Updated user: ${user.email} (Password: dekdee123)`);

    // Add some sample records
    const records = [];
    const now = new Date();

    // Check if user already has records
    const existingCount = await prisma.bMIRecord.count({ where: { userId: user.id } });

    if (existingCount === 0) {
        console.log("Seeding records...");
        for (let i = 0; i < 20; i++) {
            const recordedAt = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const height = 170 + Math.random() * 5;
            const weight = 65 + Math.random() * 10;
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);

            let category = "Normal";
            if (bmi < 18.5) category = "Underweight";
            else if (bmi < 25) category = "Normal";
            else if (bmi < 30) category = "Overweight";
            else category = "Obese";

            records.push({
                userId: user.id,
                weight: parseFloat(weight.toFixed(1)),
                height: parseFloat(height.toFixed(1)),
                bmi: parseFloat(bmi.toFixed(1)),
                category,
                recordedAt,
            });
        }

        await prisma.bMIRecord.createMany({
            data: records,
        });
    }

    console.log("Seeding complete.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
