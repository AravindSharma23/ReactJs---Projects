import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth,db } from './firebase';
import {setDoc,doc} from 'firebase/firestore';
import { toast } from 'react-toastify';

export const SignUp = () => {
  const [name,setName] = useState('');
  const [email,setEmail] =   useState('');
  const [password,setPassword] =   useState('');
  const[confirmPass,setConfirmPass] =  useState('');

  const handleRegister = async(e)=>{
    console.log("passed");
    e.preventDefault();
    try{
      await createUserWithEmailAndPassword(auth,email,password);
      const user = auth.currentUser;
      console.log("user ",user);
      if(user){
        await setDoc(doc(db,"Users",user.uid),{
            name : name,
            email : user.email,
            mobile: '',
            sex : '',
            dob :'',
            address : '',
        });
      }
      console.log("user Registered Successfully");


      toast.success("User Registered Successfully!",{
        position : 'top-center',
      })
      setTimeout(()=>{
        window.location.href="/profile";
      },2000);
    }catch(error){
       console.log(error.message);
       toast.error(error.message,{
        position : 'bottom-center',
       })
    }
  }
    return (
        <div>
            <div class="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
                <div class="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
                    <div class="text-center mb-12">
                        <a href=""><img
                            src="https://readymadeui.com/readymadeui.svg" alt="logo" class='w-40 inline-block' />
                        </a>
                    </div>

                    <form onSubmit={(e)=>{handleRegister(e)}}>
                        <div class="space-y-6">

                            <div>
                                <label class="text-gray-800 text-sm mb-2 block">UserName</label>
                                <input name="name" type="text"
                                value={name}
                                onChange={(e)=>{setName(e.target.value)}}
                                 class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Name" />
                            </div>
                            <div>
                                <label class="text-gray-800 text-sm mb-2 block">Email Id</label>
                                <input name="email" type="text" 
                                 value={email}
                                 onChange={(e)=>{setEmail(e.target.value)}}
                                class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" />
                            </div>
                            <div>
                                <label class="text-gray-800 text-sm mb-2 block">Password</label>
                                <input name="password" type="password"
                                 value={password}
                                 onChange={(e)=>{setPassword(e.target.value)}}
                                 class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
                            </div>
                            <div>
                                <label class="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                                <input name="cpassword" type="password" 
                                 value={confirmPass}
                                 onChange={(e)=>{setConfirmPass(e.target.value)}}
                                class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter confirm password" />
                            </div>

                            {/* <div class="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                <label for="remember-me" class="text-gray-800 ml-3 block text-sm">
                                    I accept the <a href="javascript:void(0);" class="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</a>
                                </label>
                            </div> */}
                        </div>

                        <div class="!mt-12">
                            <button type="submit" class="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                Create an account
                            </button>
                        </div>
                        <p class="text-gray-800 text-sm mt-6 text-center">Already have an account? <a href="" class="text-blue-600 font-semibold hover:underline ml-1">Login here</a></p>
                    </form>
                </div>
            </div>

        </div>
    )
}

