import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and OTP are required",
        },
        { status: 400 }
      );
    }

    const otpRecord = await prisma.otpCode.findFirst({
      where: {
        email,
        otp,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!otpRecord) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP",
        },
        { status: 400 }
      );
    }

    if (otpRecord.used) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP already used",
        },
        { status: 400 }
      );
    }

    if (new Date() > otpRecord.expiresAt) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP expired",
        },
        { status: 400 }
      );
    }

    await prisma.otpCode.update({
      where: {
        id: otpRecord.id,
      },
      data: {
        used: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "OTP verified successfully",
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