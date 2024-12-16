
// import * as sdk from 'node-appwrite'
// export const {
//     PROJECT_ID,
//     API_KEY,
//     DATABASE_ID,
//     PATIENT_COLLECTION_ID,
//     DOCTOR_COLLECTION_ID,
//     APPOINTMENT_COLLECTION_ID,
//     NEXT_PUBLIC_BUCKET_ID,
//     NEXT_PUBLIC_ENDPOINT:ENDPOINT
// } = process.env

// const client = new sdk.Client();
// client
//     .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
//     .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)
//     .setKey(process.env.API_KEY!)


// export const account = new sdk.Account(client)
// export const databases = new sdk.Databases(client)
// export const storage = new sdk.Storage(client)
// export const  messaging = new sdk.Messaging(client)
// export const users = new sdk.Users(client)
// export const  = new sdk.(client)

import {Client, Databases , Account , Storage, Messaging} from 'node-appwrite'

// admin client
const createAdminClient = async()=>{

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)
    .setKey(process.env.API_KEY!)

    

    // Your secret API key

    return {
        get account(){
            return new Account(client)
        },
        get databases(){
            return new Databases(client)
        }, 
        get storage(){
            return new Storage(client)
        },
        get messaging(){
            return new Messaging(client)
        }
    }
}
const createSessionClient = async(session : string)=>{
    
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)

        // Your project ID
  

if(session){
    client.setSession(session)
}
// Your secret API key

return {
    get account(){
        return new Account(client)
    },
    get databases(){
        return new Databases(client)
    }, 
  
}
}

export {createAdminClient , createSessionClient}
