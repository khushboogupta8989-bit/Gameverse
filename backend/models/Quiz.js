const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [String],
  correct: { type: Number, required: true }
});

const QuizSchema = new mongoose.Schema({
  level: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  difficulty: { type: String },
  questions: [QuestionSchema]
});

// THIS LAST LINE IS CRITICAL:
module.exports = mongoose.model('Quiz', QuizSchema);