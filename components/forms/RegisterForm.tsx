"use client"
 

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,

  // button checkbox form input label radio-group select textarea
  
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation} from "@/lib/validation"
import { useRouter } from "next/navigation"
import {  registerPatient } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";
 

 
export function RegisterForm({user} : {user : User}) {
  const router = useRouter()
    const [isLoading , setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation >>({
    resolver: zodResolver(PatientFormValidation ),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email : "",
      phone : "",


    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values : z.infer<typeof PatientFormValidation >) {
    setIsLoading(true)
    let formData;
    if(values.identificationDocument && values.identificationDocument.length > 0){
      const blobFile = new Blob([values.identificationDocument[0]],{
        type : values.identificationDocument[0].type
      })
      formData = new FormData()
      formData.append('blobFile' , blobFile)
      formData.append('fileName' , values.identificationDocument[0].name)
    }
    try {
      const patientData = {
        ...values, 
        userId : user.$id,
        birthDate : new Date(values.birthDate),
        identificationDocument : formData 

      }
      const patient = await registerPatient(patientData)

      if(patient) {
        router.push(`/patients/${user.$id}/new-appointment`)
      }
    } catch (error) {
      console.log(error)
    }

  }
  return  <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 flex-1">
    <section className="space-y-4">
        <h1 className="header ">Welcome 👏</h1>
        <p className="text-dark-700">Let us Get to know you</p>
    </section>
    <section className="space-y-6">
        <div className="mb-9 space-y-1">

        <h1 className="sub-header">Personal Information</h1>
        </div>
    </section>
    <CustomFormField control={form.control}
    fieldType = {FormFieldType.INPUT}
    name = 'name'
    label = "Full Name"
    placeholder = "john doe"
    iconSrc = '/assets/icons/user.svg'
    iconAlt = "user"
    />

  <div className="flex flex-col gap-6 xl:flex-row">
  <CustomFormField control={form.control}
    fieldType = {FormFieldType.INPUT}
    name = 'email'
    label = "Email"
    placeholder = "johndoe@gmail.com"
    iconSrc = '/assets/icons/email.svg'
    iconAlt = "email"
    />
    <CustomFormField control={form.control}
    fieldType = {FormFieldType.PHONE_INPUT}
    name = 'phone'
    label = "Phone number"
    placeholder = "(234) 123 4567"
 
    />
  </div>
  <div className="flex flex-col gap-6  xl:flex-row">
  <CustomFormField control={form.control}
    fieldType = {FormFieldType.DATE_PICKER}
    name = 'birthDate'
    label = "Date of Birth"
 
    />
    <CustomFormField control={form.control}
    fieldType = {FormFieldType.SKELETON}
    name = 'gender'
    label = "Gender"
  renderSkeleton={(field)=> (
    <FormControl>
      <RadioGroup 
      className='flex h-11 gap-6 xl:justify-between'
      onValueChange={field.onChange}
      defaultValue={field.value}
      >
        {GenderOptions.map(option =>(
          <div key={option} className="radio-group">
            <RadioGroupItem value={option} id={option}/>
            <Label htmlFor={option} className="cursor-pointer">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  )}
 
    />
  </div>

  <div className="flex flex-col gap-6 xl:flex-row">
  <CustomFormField control={form.control}
    fieldType = {FormFieldType.INPUT}
    name = 'address'
    label = "Address"
    placeholder = "555 boulevard road"
    />
    <CustomFormField control={form.control}
    fieldType = {FormFieldType.INPUT}
    name = 'occupation'
    label = "Occupation"
    placeholder = "Software Engineer"
 
    />
  </div>
  <div className="flex flex-col gap-6 xl:flex-row">
  <CustomFormField control={form.control}
    fieldType = {FormFieldType.INPUT}
    name = 'emergencyContactName'
    label = "Emergency Contact Name"
    placeholder = "Guardian's Name"
    />
    <CustomFormField control={form.control}
    fieldType = {FormFieldType.PHONE_INPUT}
    name = 'emergencyContactNumber'
    label = "Emergency Contact Number"
    placeholder = "(234) 123 4567"
 
    />
  </div>
  <br/>
  <section className="space-y-6">
        <div className="mb-9 space-y-1">

        <h1 className="sub-header">Medical Information</h1>
        </div>
    </section>
    <CustomFormField control={form.control}
    fieldType = {FormFieldType.SELECT}
    name = 'primaryPhysician'
    label = "Primary Physician"
    placeholder="Select a physician"
 >
        {Doctors.map(doctor=><SelectItem key={doctor.name} value={doctor.name}>
            <div className="flex cursor-pointer items-center gap-2">
              <Image
              src={doctor.image}
              width={32}
              height={32}
              alt={doctor.name}
              className="border border-dark-500 rounded-full"
              />
              <p>{doctor.name}</p>
            </div>
        </SelectItem>)}
 </CustomFormField>
  <div className="flex flex-col gap-6 xl:flex-row">
  <CustomFormField control={form.control}
    fieldType = {FormFieldType.INPUT}
    name = 'insuranceProvider'
    label = "Insurance Provider"
    placeholder = "Arm HealthCare"
    />
    <CustomFormField control={form.control}
    fieldType = {FormFieldType.INPUT}
    name = 'insurancePolicyNumber'
    label = "Insurance Policy Number"
    placeholder = "ABC1234"
 
    />
  </div>
  <div className="flex flex-col gap-6 xl:flex-row">
  <CustomFormField control={form.control}
    fieldType = {FormFieldType.TEXTAREA}
    name = 'allergies'
    label = "Allergies (if any)"
    placeholder = "Peanuts"
    />
    <CustomFormField control={form.control}
    fieldType = {FormFieldType.TEXTAREA}
    name = 'currentMedication'
    label = "Current Medication (if any)"
    placeholder = "Pain killers , ibuprofin 200mg"
 
    />
  </div>
  <div className="flex flex-col gap-6 xl:flex-row">
  <CustomFormField control={form.control}
    fieldType = {FormFieldType.TEXTAREA}
    name = 'familyMedicalHistory'
    label = "Family medical history (if any)"
    placeholder = "Grandfather had Diabetes.."
    />
    <CustomFormField control={form.control}
    fieldType = {FormFieldType.TEXTAREA}
    name = 'pastMedicalHistory'
    label = "Past Medical History (if any)"
    placeholder = "Used to have Asthma"
 
    />
  </div>
  <br/>
  <section className="space-y-6">
        <div className="mb-9 space-y-1">

        <h1 className="sub-header">Identification and Verification</h1>
        </div>
    </section>

    <CustomFormField control={form.control}
    fieldType = {FormFieldType.SELECT}
    name = 'identificationType'
    label = "Identification Type"
    placeholder="Select identification type"
 >
        {IdentificationTypes.map(type=><SelectItem key={type} value={type}>
            {type}
        </SelectItem>)}
 </CustomFormField>
 <CustomFormField control={form.control}
    fieldType = {FormFieldType.INPUT}
    name = 'identificationNumber'
    label = "Identification Number"
    placeholder="12345678"
   />

<CustomFormField control={form.control}
    fieldType = {FormFieldType.SKELETON}
    name = 'identificationDocument'
    label = "Scanned copy of identification document"
  renderSkeleton={(field)=> (
    <FormControl>
      {/* File upload */}
      <FileUploader
      files={field.value}
      onChange={field.onChange}
      />
    </FormControl>
  )}
  />
    <br/>
  <section className="space-y-6">
        <div className="mb-9 space-y-1">

        <h1 className="sub-header">Consent And Privacy</h1>
        </div>
    </section>

<CustomFormField
fieldType={FormFieldType.CHECKBOX} control={form.control}
name="treatmentConsent"
label="I consent to treatment"
/>
<CustomFormField
fieldType={FormFieldType.CHECKBOX} control={form.control}
name="disclosureConsent"
label="I consent to disclosure of information"
/>
<CustomFormField
fieldType={FormFieldType.CHECKBOX} control={form.control}
name="privacyConsent"
label="I consent to privacy policies"
>
  
</CustomFormField>
 
  {/* <div className="flex flex-col gap-6 xl:flex-row"></div>
  <div className="flex flex-col gap-6 xl:flex-row"></div>
  <div className="flex flex-col gap-6 xl:flex-row"></div>
  <div className="flex flex-col gap-6 xl:flex-row"></div>
  <div className="flex flex-col gap-6 xl:flex-row"></div>
  <div className="flex flex-col gap-6 xl:flex-row"></div> */}

    <SubmitButton isLoading={isLoading}>
        Get Started
    </SubmitButton>
  </form>
</Form>
}

export default RegisterForm
