"use server"

import prisma from "@/lib/prisma";

export async function addItem(formData: FormData) {
    const result = await prisma.item.create({
        data: {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            categoryId: parseInt(formData.get("category") as string, 10),
        }
    });

    console.log(`Added Item ID Result: ${result.id}`);
}

export async function addItemCategory(formData: FormData) {

    console.log(`formData: ${formData}`);

    const result = await prisma.itemCategory.create({
        data: {
            name: formData.get("name") as string,
        }
    });

    console.log(`Added ItemCategory ID Result: ${result.id}`);
}
