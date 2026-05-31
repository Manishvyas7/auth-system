"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } =
    useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    setLoading(false);

    alert(result.message);

    if (result.success) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Login to continue
        </p>

        <div className="flex gap-3 mb-6">

          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/dashboard",
              })
            }
            className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-3 hover:bg-gray-50"
          >
            <FcGoogle size={22} />
            Google
          </button>

          <button
            onClick={() =>
              signIn("azure-ad", {
                callbackUrl: "/dashboard",
              })
            }
            className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-3 hover:bg-gray-50"
          >
            <FaMicrosoft size={18} />
            Microsoft
          </button>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full border rounded-lg p-3"
          />

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-lg p-3"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={() =>
            router.push("/forgot-password")
          }
          className="mt-4 text-blue-600 text-sm"
        >
          Forgot Password?
        </button>

        <p className="text-center mt-6 text-sm">
          Don't have an account?
          <span
            onClick={() =>
              router.push("/signup")
            }
            className="ml-1 text-blue-600 cursor-pointer"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}