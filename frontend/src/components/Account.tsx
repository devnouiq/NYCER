import React,{createContext, useState} from 'react'
import UserPool from "../UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const AccountContext=createContext();

const Account = (props) => {
  // const  [currentUser,setCurrentUser]=useState<>();
    const getSession=async()=>{
        return await new Promise((resolve,reject)=>{
            const user=UserPool.getCurrentUser();
            if(user){
                user.getSession((err,session)=>{
                    if(err){
                        reject()
                    }
                    else{
                        resolve(session)
                    }
                })
            }
            else{
                reject();
            }
        })
    }
    const authenticate=async(email:string,password:string)=>{
        return await new Promise((resolve,reject)=>{
            const User = new CognitoUser({
                Username: email,
                Pool: UserPool,
              });
          
              const authDetails = new AuthenticationDetails({
                Username: email,
                Password: password,
              });
          
              User.authenticateUser(authDetails,{
                onSuccess:(data)=>{
                  console.log(data);
                  // setCurrentUser(data);
                  resolve(data);
                },
                onFailure:(err)=>{
                  console.log(err);
                  reject(err)
                },
          
                newPasswordRequired:(data)=>{
                  console.log(data);
                  
                }
              })
        })
    }

    const logout=()=>{
        const user=UserPool.getCurrentUser();
        if(user){
            user.signOut();
        }
    }
  return (
    <AccountContext.Provider value={{authenticate,getSession,logout}}>
        {props.children}
    </AccountContext.Provider>
  )
}

export {Account,AccountContext}