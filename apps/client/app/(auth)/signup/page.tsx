"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { registerSchemaClient, RegisterClient } from "@repo/validation";
import { useSignup } from "@/features/Authentication/hooks/useSignup";

export default function SignUpPage() {
  const { signup, isPending } = useSignup();
  const form = useForm<RegisterClient>({
    resolver: zodResolver(registerSchemaClient),
  });

  const onSubmit = (data: RegisterClient) => {
    signup(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-4 lg:p-8">
        <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-6">
          Create Account
        </h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              {...form.register("name")}
              className="w-full px-4 pt-5 pb-2 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <label className="absolute left-4 top-2.5 text-xs text-zinc-400 transition-all">
              Full Name
            </label>
            {form.formState.errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              {...form.register("email")}
              className="w-full px-4 pt-5 pb-2 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <label className="absolute left-4 top-2.5 text-xs text-zinc-400 transition-all">
              Email Address
            </label>
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              {...form.register("password")}
              className="w-full px-4 pt-5 pb-2 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <label className="absolute left-4 top-2.5 text-xs text-zinc-400 transition-all">
              Password
            </label>
            {form.formState.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type="password"
              {...form.register("passwordConfirm")}
              className="w-full px-4 pt-5 pb-2 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <label className="absolute left-4 top-2.5 text-xs text-zinc-400 transition-all">
              Confirm Password
            </label>
            {form.formState.errors.passwordConfirm && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.passwordConfirm.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-black cursor-pointer text-yellow-400 font-semibold py-2 rounded-lg hover:bg-black/80 hover:text-yellow-400 transition-colors duration-300"
          >
            Sign up
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-5">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-yellow-500 hover:text-black font-medium transition-colors"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
