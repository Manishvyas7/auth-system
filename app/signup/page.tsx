"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const res = await fetch("/api/signup", {
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
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>

        <p className="text-center text-gray-500 mb-6">Signup to continue</p>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/dashboard",
              })
            }
            className="flex-1 border rounded-lg py-3 flex justify-center items-center gap-2"
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
            className="flex-1 border rounded-lg py-3 flex justify-center items-center gap-2"
          >
            <FaMicrosoft />
            Microsoft
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full border rounded-lg p-3"
          />

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
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
