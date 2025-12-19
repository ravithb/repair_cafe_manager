'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createRepairItem(formData: FormData) {
  const item = formData.get("item") as string;
  const categoryId = Number(formData.get("categoryId"));
  const weight = parseFloat(formData.get("weight") as string);
  const status = formData.get("status") as string;
  const notes = formData.get("notes") as string;

  // Use a transaction to ensure both are created or none
  await prisma.$transaction(async (tx) => {
    const newItem = await tx.repair_items.create({
      data: {
        item,
        category_id: categoryId,
        weight,
        last_repair_status: status,
        customer_id: 1, // Placeholder: replace with actual auth user ID
      },
    });

    // await tx.repair_item_sessions.create({
    //   data: {
    //     repair_item_id: newItem.id,
    //     status: status,
    //     notes: notes,
    //   },
    // });
  });

  revalidatePath("/repair-items");
}