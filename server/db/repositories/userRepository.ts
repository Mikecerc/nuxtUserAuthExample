import { IUser } from "~~/types/IUser";
import { userModel } from "../models/userModel"

export async function getUserByEmail(email: string): Promise<IUser> {
    return await userModel.findOne({ email: email });
  }
  
  export async function getUserByUserName(username: string): Promise<IUser> {
   return await userModel.findOne({ username: username });
  }
  
  export async function createUser(data: IUser){
   return new userModel(data).save();
  }
  
  export async function getUserById(id: number): Promise<IUser> {
    return await userModel.findById(id);
  }
  