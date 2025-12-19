'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function upsertCategory(formData: FormData) {
  const id = formData.get("id") ? Number(formData.get("id")) : undefined;
  const categoryName = formData.get("category") as string;

  if (id) {
    await prisma.repair_item_categories.update({
      where: { id },
      data: { category: categoryName },
    });
  } else {
    await prisma.repair_item_categories.create({
      data: { category: categoryName },
    });
  }

  revalidatePath("/categories");
}

export async function deleteCategory(id: number) {
  await prisma.repair_item_categories.delete({
    where: { id },
  });
  revalidatePath("/categories");
}