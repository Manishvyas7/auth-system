import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/email";


// =========================
// GET REQUEST
// =========================

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Signup API is working",
  });
}


// =========================
// POST REQUEST
// =========================

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    // =========================
    // VALIDATION
    // =========================

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // =========================
    // CHECK EXISTING USER
    // =========================

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 409 }
      );
    }

    // =========================
    // HASH PASSWORD
    // =========================

    const hashedPassword = await bcrypt.hash(password, 10);

    // =========================
    // CREATE USER
    // =========================

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // =========================
    // SEND EMAIL
    // =========================

    sendWelcomeEmail(email, name).catch(console.error);

    // =========================
    // SUCCESS RESPONSE
    // =========================

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}