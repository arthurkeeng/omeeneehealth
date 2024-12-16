

import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import Image from "next/image";
import Link from "next/link";


<<<<<<< HE
}
export default async function Home({params , searchParams} : SearchParamProps) {
=======
export default async function Home({params , searchParams}) {
>>>>>>> 6f30e000766c2a5e512ea562fc34ea2b3f2d6a85
  const {admin} = await searchParams
  return (
    <div className="max-h-screen flex h-screen">
      {/* otp verification /passkey modal */}
      {admin && <PasskeyModal/>}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
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
          <PatientForm/>
          <div className="text-14-regular mt-20 flex justify-between ">
          <p className="text-dark-600 justify-items-end xl:text-left">
            © 2024 omeeneeHealth
            </p>
            <Link href="/?admin=true" className="text-green-500">Admin</Link>
          </div>
        </div>
      </section>
      <Image 
      src='/assets/images/onboarding-img.png'
      height={1000}
      width={1000}
      alt="patient"
      className="side-img max-w-[50%]"
      />
    </div>
  );
}
