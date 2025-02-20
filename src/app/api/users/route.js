import dbConnect from '../../../utils/db';
import User from '../../../../models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, contact, type } = body;

    if (!name || !contact || !type) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const newUser = new User({ name, contact, type });
    await newUser.save();
    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}