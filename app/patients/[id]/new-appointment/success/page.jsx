import { Button } from "@/components/ui/button"
import { Doctors } from "@/constants"
import { getAppointment } from "@/lib/actions/appointment.action"
import { formatDateTime } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"




// const SuccessPage = async ({params  , searchParams} : SearchParamProps) => {
const SuccessPage = async ({params  , searchParams} ) => {
  const {id} = await params
  const {appointmentId } = await searchParams 
  // const appointmentId = await (searchParams?.appointmentId as string || "")

  // const appointment = await getAppointment(appointmentId as string)
  const appointment = await getAppointment(appointmentId)

  const doctor = Doctors.find(doc => doc.name === appointment.primaryPhysician)
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href='/' className="flex align-middle">
          <Image
          src='/assets/icons/medical.png'
          height={1000}
          width={1000}
          alt="logo"
          className="h-10 w-fit"
          />
        <p className="ml-3 font-bold text-xl">OmeeneeHealth</p>
        </Link>
        <section className="flex flex-col items-center">
          <Image
          src='/assets/gifs/success.gif'
          height={300}
          width={280}
          alt="success"
          />
        <h2 className="header mb-6 max-w-[600px] text-center">
          Your <span className="text-green-500">Appointment request</span>
          has been successfully submitted !
        </h2>
        <p>We will be in touch shortly to confirm appointment</p>
        </section>
        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Image
            src={doctor.image}
            // src={doctor?.image!}
            alt="doctor"
            width={100}
            height={100}
            className="size-6"
            />
            <p className="whitespace-nowrap">
              {doctor?.name}
            </p>
            <div className="flex gap-2">
              <Image
              src='/assets/icons/calendar.svg'
              height={24}
              width={24}
              alt="calendar"
              />
              <p>{formatDateTime(appointment.schedule).dateTime}</p>
            </div>
          </div>
        </section>
        <Button variant='outline' className="shad-primary-btn" asChild>
          <Link href={`/patients/${id}/new-appointment`}>
          New Appointment</Link>
        </Button>
        <p className="copyright">© 2024 OmeeneeHealth</p>
      </div>
      
    </div>
  )
}

export default SuccessPage
