"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const validationSchema = z.object({
  password: z.string().min(8, { message: "Password is required" }),
  email: z.string().min(5, { message: "Email is required" }).email({
    message: "Must be a valid email",
  })
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function Form() {
  const supabase = createClientComponentClient();

  const { register, handleSubmit, formState: { errors }} = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  })

  const router = useRouter()
  const [view, setView] = useState('ok');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    setIsLoading(true);
    const login = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })
    if(login.data.user) {
      if(login.data.user.user_metadata.role === "Administrator") {
        router.push('/')
      } else {
        await supabase.auth.signOut();
        // @ts-ignore
        window.modal_only_administator.showModal();
      }
      router.refresh()
    } else {
      setView('bad-credential');
    }
    setIsLoading(false);
  }

  return (
    <>
      <form className="grid grid-cols-1 gap-3 mt-8" onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="mb-2">
          <select className="select select-bordered">
            {
              roles.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))
            }
          </select>
        </div> */}
        <div>
          <label className="block mb-1 text-sm text-gray-600 dark:text-gray-200">Email</label>
          <input {...register('email')} type="email" placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
          {errors.email && (
            <p className="text-xs italic text-red-500 mt-2"> {errors.email?.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-sm text-gray-600 dark:text-gray-200">Password</label>
          <input {...register('password')} type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
          {errors.password && (
            <p className="text-xs italic text-red-500 mt-2"> {errors.password?.message}
            </p>
          )}
        </div>

        {
          view === 'bad-credential' &&
          <div className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Email / password doesn't match.</span>
          </div>
        }
        
        <button type="submit" className="btn btn-primary flex items-center w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform">
          {
            isLoading ? <span className="loading loading-dots loading-md"></span> : <span>Login</span>
          }
        </button>

      </form>
      <dialog id="modal_only_administator" className="modal">
        <section className="modal-box">
          <h3 className="font-bold text-2lg">Attention!</h3>
          <p className="py-4">Only the Administrator role can access the page.</p>
          <div className="modal-action">
            {/* @ts-ignore */}
            <button className="btn btn-primary" onClick={() => window.modal_only_administator.close()}>Close</button>
          </div>
        </section>
      </dialog>
    </>
  )
}