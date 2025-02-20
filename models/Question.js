import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  choices: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  level: { type: Number, required: true } // Ensure level is stored as a number
});

export default mongoose.models.Question || mongoose.model("Question", QuestionSchema);