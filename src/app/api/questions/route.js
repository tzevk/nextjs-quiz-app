// import dbConnect from '../../../utils/db';
// import Question from '../../../../models/Question';
// import { NextResponse } from 'next/server';

// export async function GET(request) {
//   try {
//     await dbConnect();
    
//     // Get the level from the URL query parameters
//     const { searchParams } = new URL(request.url);
//     const level = searchParams.get('level') || 1;

//     // Fetch questions for the specified level
//     const questions = await Question.find({ level: parseInt(level) });
    
//     if (!questions.length) {
//       return NextResponse.json(
//         { error: 'No questions found for this level' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(questions);
//   } catch (error) {
//     console.error('Error fetching questions:', error);
//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }
// } 

import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Question from "@/models/Question";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const level = Number(searchParams.get("level"));

  try {
    const questions = await Question.find({ level });
    
    if (questions.length === 0) {
      return NextResponse.json({ error: "No questions found" }, { status: 404 });
    }

    // Shuffle and return 10 questions
    const shuffled = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
    
    return NextResponse.json(shuffled, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}