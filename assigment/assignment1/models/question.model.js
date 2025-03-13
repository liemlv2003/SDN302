import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    options: {

        type: [String],
        required: true,
    },
    keywords: {
        type: [String],
        required: true,
    },
    correctAnswerIndex: {
        type: Number,
        required: true,
    },
});

const Question = mongoose.model("Question", QuestionSchema);

export default Question;