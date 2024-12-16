import RegisterForm from "@/components/forms/RegisterForm"
import { getUser } from "@/lib/actions/patient.actions"
import Image from "next/image"



const PatientRegisterPage = async () => {
  const user = await getUser()
  return (
    <div className="max-h-screen flex h-screen">
      
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
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
          <RegisterForm user={user}/>
          <p className="copyright py-12">
            © 2024 omeeneeHealth
            </p>
         
        </div>
      </section>
      <Image 
      src='/assets/images/register-img.png'
      height={5000}
      width={1000}
      alt="patient"
      className="side-img max-w-[500px] h-full"
      />
    </div>
  )
}

export default PatientRegisterPage
