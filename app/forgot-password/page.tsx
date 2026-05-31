"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
};

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const res = await fetch(
      "/api/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    setLoading(false);

    alert(result.message);

    if (result.success) {
      router.push("/reset-password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Enter your email to receive OTP
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <input
            {...register("email")}
            placeholder="Enter Email"
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-lg p-3"
          >
            {loading
              ? "Sending OTP..."
              : "Send OTP"}
          </button>
        </form>

      </div>

    </div>
  );
}