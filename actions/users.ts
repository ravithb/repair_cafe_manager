'use server'

import { Role, User } from "@/app/types";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function getUserByEmail(email: string) {
  return prisma.users.findFirst({
    where: {
      email: { equals: email }
    }
  });
}

export async function getAllUsers() {
  const usersDB = await prisma.users.findMany({
    orderBy: { email: "asc" }
  });

  var users: User[] = [];
  for (let i = 0; i < usersDB.length; i++) {
    const user = usersDB[i];
    users[i] = {} as User;
    users[i].id = user.id;
    users[i].email = user.email;
    users[i].roles = (user?.roles?.split(",").sort().map(u => u as Role) || [] as Role[])
  }

  return users;
}

export async function upsertUser(user: User) {
  console.log('Upserting user ', user);
  if (!user) {
    return;
  }
  if (user.id && user.id > 0) {
    await prisma.users.update({
      data: { email: user.email, roles: user.roles?.join(",") || "GUEST" },
      where: { id: user?.id }
    });
  } else {
    await prisma.users.create({
      data: { email: user.email, roles: user.roles?.join(",") || "GUEST" },
    });
  }


  revalidatePath("/settings/users");
}

export async function deleteUser(id: number) {
  await prisma.users.delete({
    where: { id },
  });
  revalidatePath("/settings/users");
}