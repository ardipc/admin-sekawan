"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import Link from "next/link";

const validationSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  phone: z.string().min(3, { message: "Phone is required" }),
  password: z.string().min(8, { message: "Password is required" }),
  confirmPassword: z.string().min(8, { message: "Confirm password is required" }),
  email: z.string().min(5, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept Terms and Conditions" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Password don't match",
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function AdminForm() {
  
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState('register');

  const { register, handleSubmit, formState: { errors }} = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    let meta: any = {
      phone: data.phone,
      name: data.name,
      role: "Administrator"
    };

    setIsLoading(true);
    await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: meta,
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setView(`check-email`);
    setIsLoading(false);
  }

  return (
    <form className="grid grid-cols-1 gap-3 mt-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-200">Name</label>
        <input {...register('name')} type="text" placeholder="John Snow" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
        {errors.name && (
          <p className="text-xs italic text-red-500 mt-2"> {errors.name?.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-200">Phone</label>
        <input {...register('phone')} type="text" placeholder="Enter" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
        {errors.phone && (
          <p className="text-xs italic text-red-500 mt-2"> {errors.phone?.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-200">Email</label>
        <input {...register('email')} type="email" placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
        {errors.email && (
          <p className="text-xs italic text-red-500 mt-2"> {errors.email?.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-200">Password</label>
        <input {...register('password')} type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
        {errors.password && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.password?.message}
            </p>
          )}
      </div>
      <div className="mb-1">
        <label className="block text-sm text-gray-600 dark:text-gray-200">Confirm Password</label>
        <input {...register('confirmPassword')} type="password" placeholder="Enter confirm password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
        {errors.confirmPassword && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.confirmPassword?.message}
            </p>
          )}
      </div>

      <div className="mb-1">
        <input type="checkbox" id="terms" {...register("terms")} />
        <label
          htmlFor="terms"
          className={`ml-2 mb-2 text-sm font-bold ${
            errors.terms ? "text-red-500" : "text-gray-700"
          }`}
        >
          Accept Terms & Conditions
        </label>
        {errors.terms && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.terms?.message}
          </p>
        )}
      </div>

      {
        view === 'check-email' &&
        <div className="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Check your mailbox to continue signing.</span>
        </div>
      }
      
      <button disabled={view === 'check-email'} type="submit" className="btn btn-primary flex items-center w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform">
        {
          isLoading ? <span className="loading loading-dots loading-md"></span> : <span>register</span>
        }
      </button>

      <p className="text-sm my-6">Already have an account? <Link href={`/signin`} className="text-primary">Sign In Now</Link></p>
    </form>
  );
}
