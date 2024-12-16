'use server'

import { ID, Query } from "node-appwrite"
import { createAdminClient, createSessionClient} from "../appwrite.config"
import { parseStringify } from "../utils"
import { cookies } from "next/headers"
import { InputFile} from 'node-appwrite/file'


export const createUser = async(user : CreateUserParams) => {
  const {email  , password , name} = user
  const {account} = await createAdminClient()
    try {

      const newUser = await account.create(ID.unique() , email ,password , name )
      const session = await account.createEmailPasswordSession(email, password)
      ;(await cookies()).set('appwrite-session' , session.secret , {
        httpOnly : true , secure : true , sameSite : "strict" , 
        expires : new Date(session.expire) , path : "/"
      })
      // create cookie
      
      return parseStringify({newUser})
    } catch (error : any) {
      console.log('the error' , error)
      if(error && error?.code === 409){
        try {
          
          const session = await account.createEmailPasswordSession(email, password)
          
          ;(await cookies()).set('appwrite-session' , session.secret , {
            httpOnly : true , secure : true , sameSite : "strict" , 
            expires : new Date(session.expire) , path : "/"
          })
          const sessionCookie = (await cookies()).get("appwrite-session")
          const {account : getAccount} = await createSessionClient(sessionCookie!.value)
          const user = await getAccount.get()
          return parseStringify({newUser : user})
        } catch (error : any) {
          if(error && error?.code === 401){
              
              return {
                error : true
              }
          }
        }
      }
     
    }
}

export const getUser = async()=>{
 const sessionCookie = (await cookies()).get("appwrite-session")
 try {
  // check if user is authenticated
  if(sessionCookie){
    const {account} = await createSessionClient(sessionCookie.value)
    const user = await account.get()
    return parseStringify(user)
  }
 } catch (error) {
    console.log(error)
 }
}
export const getPatient= async(id : string)=>{
  const {databases} = await createAdminClient()
 try {
  
  const patient = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
    [
      Query.equal("userId" , id)
    ]
  )
  return parseStringify(patient.documents[0])
 } catch (error) {
    console.log(error)
 }
}

export const registerPatient = async({identificationDocument , ...patient}: RegisterUserParams) =>{
  const {storage , databases} = await createAdminClient()
    try {
      let file;

      if(identificationDocument){
        const inputFile = InputFile.fromBuffer(identificationDocument?.get('blobFile') as Blob,
            identificationDocument?.get('fileName')as string)

        file = await storage.createFile(process.env.NEXT_PUBLIC_BUCKET_ID! , ID.unique() , inputFile)
      }

      const newPatient = await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
        ID.unique(),
        {
          identificationDocumentId : file?.$id || null , 
          identificationDocumentUrl : `${process.env.NEXT_PUBLIC_ENDPOINT}/
          storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/
          ${file?.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}
          `,
          ...patient
        }
      )
     return  parseStringify(newPatient)
    } catch (error) {
      console.log(error)
    }
}

// "@radix-ui/react-primitive": "^2.0.1",


