"use server"

import prisma from "@/lib/prisma";

export async function addItem(formData: FormData) {
    const result = await prisma.items.create({
        data: {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            classId: parseInt(formData.get("class") as string, 10),
        }
    });

    console.log(`Added Item ID Result: ${result.id}`);
}
