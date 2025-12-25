'use server'

import { OperationResult } from "@/app/types";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { revalidatePath } from "next/cache";

dayjs.extend(customParseFormat);

export async function createRepairItem(formData: FormData): Promise<OperationResult> {
  const item = formData.get("item") as string;
  const categoryId = Number(formData.get("categoryId"));
  const weight = parseFloat(formData.get("weight") as string);
  const status = formData.get("status") as string;
  const make = formData.get("make") as string;
  const model = formData.get("model") as string;
  const fault = formData.get("fault") as string;
  // customer fields
  let customerId = formData.get("customerId") as string;
  const title = formData.get("customerTitle") as string;
  const firstname = formData.get("customerFirstName") as string;
  const lastname = formData.get("customerLastName") as string;
  const phone = formData.get("customerPhone") as string;
  const email = formData.get("customerEmail") as string;

  // repair attempt
  const notes = formData.get("notes") as string;
  const locationId = formData.get("locationId") as string;
  const sessionDate = formData.get("sessionDate") as string;
  const primaryRepairerId = formData.get("primaryRepairerId") as string;
  const secondaryRepairerId = formData.get("secondaryRepairerId") as string;



  // Use a transaction to ensure both are created or none
  try {
    return await prisma.$transaction(async (tx) => {

      if (typeof customerId == 'undefined' || customerId == null || customerId.trim().length == 0) {
        const newCustomer = await tx.customers.create({
          data: {
            title,
            firstname,
            lastname,
            email,
            phone
          },
        });
        customerId = newCustomer.id + "";
      }

      console.log('location ' + locationId + " sessionDate " + sessionDate);
      const sessionDateYMD = dayjs(sessionDate, 'DD/MM/YYYY');
      let repairSession = await tx.repair_sessions.findFirst({
        where: {
          AND: [{ location_id: { equals: parseInt(locationId) } },
          { session_date: { equals: sessionDateYMD.toDate() } },
          { customer_id: { equals: parseInt(customerId) } }
          ]
        }
      });
      
      if (repairSession == null) {
        repairSession = await tx.repair_sessions.create({
          data: {
            location_id: parseInt(locationId),
            session_date: sessionDateYMD.toDate(),
            customer_id: parseInt(customerId)
          }
        });
      }

      const newItem = await tx.repair_items.create({
        data: {
          item,
          fault,
          make,
          model,
          category_id: categoryId,
          weight,
          last_repair_status: status,
          customer_id: parseInt(customerId),
          last_session_id: repairSession.id,
          repair_sessions_id: repairSession.id
        },
      });
      await tx.repair_session_items.create({
        data: {
          repair_session_id: repairSession.id,
          repair_item_id: newItem.id,
          repair_status: status,
          notes: notes,
          primary_repairer_id: parseInt(primaryRepairerId),
          secondary_repairer_id: parseInt(secondaryRepairerId),
        },
      });
      return { success: true, error: null };


    },  {
    timeout: 600000, // Increase to 10 seconds (in milliseconds)
    maxWait: 5000,  // Increase to 5 seconds (in milliseconds)
  });

  } catch (e: any) {
    return { success: false, error: "Error saving item. " + e.message };
  } finally{
    revalidatePath("/repairs");
  }

}

export async function upsertRepairItem(formData: FormData) {

}

export async function deleteRepairItem(id: string | Number) {

}