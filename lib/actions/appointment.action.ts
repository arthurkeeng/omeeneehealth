'use server'

import { ID, Query} from "node-appwrite";
import { parseStringify , formatDateTime} from "../utils";
import { createAdminClient } from "../appwrite.config";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";


export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  const { databases } = await createAdminClient();
  try {
    const newAppointment = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
      ID.unique(),

      appointment
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  const { databases } = await createAdminClient();
  try {
    const appointment = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
        appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppointmentList = async () => {
  const {databases} = await createAdminClient()
  try {
    const appointments = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
        [Query.orderDesc("$createdAt")]
    )
    const initialCounts = {
      scheduledCount : 0 , 
      pendingCount : 0 , 
      cancelledCount : 0
    }

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );
  const data = {
    totalCount : appointments.total, ...counts , documents: appointments.documents

  }

  return parseStringify(data)
  } catch (error) {
    console.log(error)
  }
}

export const updateAppointment = async ({
appointmentId , userId , appointment , type
} : UpdateAppointmentParams) =>{
  const { databases } = await createAdminClient();
  try {
    const updateAppointment = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
        appointmentId , appointment
    );

    if(!updateAppointment){
      throw new Error("Appointment not found")
    }
    // Todo sms notification 
    
    const smsMessage = `Hello from OmeeneeHealth
            ${type === 'schedule' ? `Your appointment has been scheduled for ${formatDateTime(appointment.schedule!).dateTime}
              with Dr. ${appointment.primaryPhysician}.
              `: `
              Hello from OmeeneeHealth
              We regret to inform you that your schedule won't be possible . Reason : ${appointment.cancellationReason}
              `}
    
    `
    await sendSMSNotification(userId , smsMessage)
    revalidatePath("/admin" , "layout")
    return parseStringify(updateAppointment)
  } catch (error) {
    console.log(error)
  }
}

export const sendSMSNotification = async (userId : string , content : string) => {

  const{ messaging }= await createAdminClient()
  try {
    const message = await messaging.createSms(
      ID.unique() , content , [] , [userId]
    )

    return parseStringify(message)
  } catch (error) {
    console.log(error)
  }

}