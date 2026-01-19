import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function getBMICategory(bmi: number) {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const { weight, height } = await req.json();
        const w = parseFloat(weight);
        const h = parseFloat(height) / 100; // convert to meters

        const bmi = w / (h * h);
        const category = getBMICategory(bmi);

        const record = await prisma.bMIRecord.create({
            data: {
                userId: session.user.id,
                weight: w,
                height: parseFloat(height),
                bmi,
                category,
            },
        });

        return NextResponse.json(record, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error saving record" }, { status: 500 });
    }
}
