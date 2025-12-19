'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function upsertRepairer(formData: FormData) {
  const id = formData.get("id") ? Number(formData.get("id")) : undefined;
  const data = {
    title: formData.get("title") as string,
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
  };

  if (id) {
    await prisma.repairers.update({ where: { id }, data });
  } else {
    await prisma.repairers.create({ data });
  }

  revalidatePath("/repairers");
}

export async function deleteRepairer(id: number) {
  await prisma.repairers.delete({ where: { id } });
  revalidatePath("/repairers");
}