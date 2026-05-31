import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { sendOtpEmail } from "@/lib/send-otp-email";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Generate OTP

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Expire after 10 minutes

    const expiresAt = new Date(
      Date.now() + 10 * 60 * 1000
    );

    await prisma.otpCode.create({
      data: {
        email,
        otp,
        expiresAt,
        userId: user.id,
      },
    });

    await sendOtpEmail(email, otp);

    return NextResponse.json(
      {
        success: true,
        message: "OTP sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}