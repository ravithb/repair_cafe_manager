// app/actions.ts
"use server"
import prisma from "@/lib/prisma";
import { Customer } from '@/app/types';

export async function searchCustomers(searchKey: string) : Promise<Customer[]> {
  try {
    const customers = await prisma.customers.findMany({
      where: { OR : [
          { phone : { contains: searchKey }},
          { email: { contains: searchKey} },
          { firstname: { contains: searchKey }},
          { lastname: { contains : searchKey }}
        ]
      },
      distinct: ['id'],
      select: {
        id: true,
        title: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true 
      },
      orderBy:  [
        {firstname:'asc'},
        {lastname:'asc'}
      ] 
    });
    return customers as Customer[];
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}

