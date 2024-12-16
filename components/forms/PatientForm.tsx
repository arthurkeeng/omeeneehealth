"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,

  
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
 
export enum FormFieldType{
    INPUT = "input",
    PASSWORD = "password",
    CHECKBOX = 'checkbox',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'

}

 
export function PatientForm() {
  const router = useRouter()
    const [isLoading , setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email : "",
      // phone : "",
      password : ''

    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({name , email ,password}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)
    try {
      const userData = {
        name , email , password
      }

      const {error , newUser : user} = await createUser(userData)
      
      if(user && !error)router.push(`/patients/${user.$id}/register`)
      if(error) {
        alert("invalid credentials")
        setIsLoading(false)
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }

  }
  return  <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
    <section className="space-y-4">
        <h1 className="header ">Hi there 👏</h1>
        <p className="text-dark-700">Schedule your first appointment</p>
    </section>
    <CustomFormField control={form.control}
    fieldType = {FormFieldType.INPUT}
    name = 'name'
    label = "Full Name"
    placeholder = "john doe"
    iconSrc = '/assets/icons/user.svg'
    iconAlt = "user"
    />
    <CustomFormField control={form.control}
    fieldType = {FormFieldType.INPUT}
    name = 'email'
    label = "Email"
    placeholder = "johndoe@gmail.com"
    iconSrc = '/assets/icons/email.svg'
    iconAlt = "email"
    />
    <CustomFormField control={form.control}
    fieldType = {FormFieldType.INPUT}
    name = 'password'
    label = "password"
    placeholder = "Enter password"
  
    />
    {/* <CustomFormField control={form.control}
    fieldType = {FormFieldType.PHONE_INPUT}
    name = 'phone'
    label = "Phone Number"
    placeholder = "(234) 123-4567"
/> */}
    <SubmitButton isLoading={isLoading}>
        Get Started
    </SubmitButton>
  </form>
</Form>
}

export default PatientForm
