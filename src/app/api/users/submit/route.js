import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import User from "@/models/User";

export async function POST(req) {
  await dbConnect();

  try {
    const { name, score, timeTaken } = await req.json();

    const newUser = new User({ name, score, timeTaken });
    await newUser.save();

    return NextResponse.json({ message: "Score submitted successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit score" }, { status: 500 });
  }
}