"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  otp: string;
  newPassword: string;
};

export default function ResetPasswordPage() {
  const router = useRouter();

  const [verified, setVerified] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [otpLoading, setOtpLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    getValues,
  } = useForm<FormData>();

  const verifyOtp = async () => {
    setOtpLoading(true);

    const res = await fetch(
      "/api/verify-otp",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email: getValues("email"),
          otp: getValues("otp"),
        }),
      }
    );

    const result = await res.json();

    setOtpLoading(false);

    alert(result.message);

    if (result.success) {
      setVerified(true);
    }
  };

  const onSubmit = async (
    data: FormData
  ) => {
    if (!verified) {
      alert("Verify OTP first");
      return;
    }

    setLoading(true);

    const res = await fetch(
      "/api/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          newPassword:
            data.newPassword,
        }),
      }
    );

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

        <h1 className="text-3xl font-bold text-center mb-2">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Verify OTP and create a new password
        </p>

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
            {...register("otp")}
            placeholder="OTP"
            className="w-full border rounded-lg p-3"
          />

          <button
            type="button"
            onClick={verifyOtp}
            disabled={otpLoading}
            className={`w-full rounded-lg p-3 text-white ${
              verified
                ? "bg-green-600"
                : "bg-blue-600"
            }`}
          >
            {verified
              ? "OTP Verified ✓"
              : otpLoading
              ? "Verifying..."
              : "Verify OTP"}
          </button>

          <input
            {...register("newPassword")}
            type="password"
            placeholder="New Password"
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-lg p-3"
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </form>

      </div>

    </div>
  );
}