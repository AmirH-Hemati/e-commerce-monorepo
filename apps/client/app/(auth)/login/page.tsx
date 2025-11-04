"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { LoginFormInputs, loginSchema } from "@repo/validation";
import { useLogin } from "@/features/Authentication/hooks/useLogin";

export default function LoginPage() {
  const { isPending, login } = useLogin();
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    login(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-4 lg:p-8">
        <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-6">
          Welcome Back
        </h2>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <div className="relative">
            <input
              type="email"
              {...form.register("email")}
              required
              className="w-full px-4 pt-5 pb-2 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <label className="absolute left-4 top-2.5 text-xs text-gray-500 transition-all">
              Email Address
            </label>
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="password"
              {...form.register("password")}
              required
              className="w-full px-4 pt-5 pb-2 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <label className="absolute left-4 top-2.5 text-xs text-gray-500 transition-all">
              Password
            </label>
            {form.formState.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-black cursor-pointer text-yellow-400 font-semibold py-2 rounded-lg hover:bg-black/80 hover:text-yellow-400 transition-colors duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-5">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-yellow-500 hover:text-black font-medium transition-colors"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
