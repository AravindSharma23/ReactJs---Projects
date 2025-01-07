import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from './firebase';
import { toast } from 'react-toastify';

export const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleLogin = async(e)=>{
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth,email,password);
        console.log("User logedin successfully");
        toast.success('Logedin successfully',{
            position :'top-center'
        })
        setTimeout(()=>{
            window.location.href="/profile"

        },2000);
      } catch (error) {
        toast.error(error.message,{
            position :'bottom-center'
        })
      }
    }
    
    return (
        <div>
            {/* <div class="bg-yellow-400 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
                <div class="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl">
                    <div class="bg-gray-800 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
                            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
                        </svg>
                    </div>
                    <form class="p-12 md:p-24">
                        <div class="flex items-center text-lg mb-6 md:mb-8">
                            <svg class="absolute ml-3" width="24" viewBox="0 0 24 24">
                                <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                            </svg>
                            <input type="text" id="username" 
                            value={name}
                            onChange={(e)=>{setName(e.target.value)}}
                            class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Username" />
                        </div>
                        <div class="flex items-center text-lg mb-6 md:mb-8">
                            <svg class="absolute ml-3" viewBox="0 0 24 24" width="24">
                                <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                            </svg>
                            <input type="password" id="password" 
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Password" />
                        </div>
                        <button class="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded">Login</button>
                    </form>
                </div>
            </div> */}
            <div
    class="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
    <div class="w-full">
        <div class="text-center">
            <h1 class="text-3xl font-semibold text-gray-900">Sign in</h1>
            <p class="mt-2 text-gray-500">Sign in below to access your account</p>
        </div>
        <div class="mt-5">
            <form onSubmit={handleLogin}>
                <div class="relative mt-6">
                    <input type="email" name="email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}

                     id="email" placeholder="Email Address" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autocomplete="NA" />
                    <label for="email" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                </div>
                <div class="relative mt-6">
                    <input type="password" name="password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}} 
                    id="password" placeholder="Password" class="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                    <label for="password" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                </div>
                <div class="my-6">
                    <button type="submit" class="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Sign in</button>
                </div>
                <p class="text-center text-sm text-gray-500">Don&#x27;t have an account yet?
                    <a href="#!"
                        class="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Sign
                        up
                    </a>.
                </p>
            </form>
        </div>
    </div>
</div>


        </div>
    )
}
