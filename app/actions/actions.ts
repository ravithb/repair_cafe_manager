// app/actions.ts
"use server"
import prisma from "@/app/lib/prisma";

export async function getLocations() {
  try {
    const locations = await prisma.locations.findMany({
      select: { id: true, location: true },
      orderBy: { location: 'asc' }
    });
    return locations;
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}