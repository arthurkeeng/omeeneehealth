
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";


// export default async function NewAppointmentPage({params} : SearchParamsProps) {
export default async function NewAppointmentPage({params} ) {

  const {id} = await params
  const patient = await getPatient(id)
  
  return (
    <div className="max-h-screen flex h-screen">
      {/* otp verification /passkey modal */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <div className="flex align-middle ">

          <Image
          src='/assets/icons/medical.png'
          width={30}
          height={30}
          alt="patient"
          className="mb-12 w-fit rounded-lg mr-3"
          />
          <h1 className="font-bold text-2xl">OmeeneeHealth
            </h1>
          </div>
          <AppointmentForm type = 'create' userId = {id}
          patientId={patient.$id}
          />
          <p className="copyright mt-10 py-10">
            © 2024 omeeneeHealth
            </p>
        </div>
      </section>
      <Image 
      src='/assets/images/appointment-img.png'
      height={1000}
      width={500}
      alt="appointment"
      className="side-img max-w-[40%] bg-bottom"
      />
    </div>
  );
}
