import prisma from "@/lib/prisma";

export async function GET() {
    const result = await prisma.item.findMany();

    if (Array.isArray(result) && result.length > 0) {
        return Response.json(result);
    }

    else {
        console.log("No Items Found !");

        return Response.json({error: "No Items Found"});
    }
}
