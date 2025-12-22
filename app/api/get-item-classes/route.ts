import prisma from "@/lib/prisma";

export async function GET() {
    const result = await prisma.itemClass.findMany();

    if (Array.isArray(result) && result.length > 0) {
        return Response.json(result);
    }

    else {
        console.log("No Item Classes Found !");

        return Response.json({error: "No Item Classes Found"});
    }
}
