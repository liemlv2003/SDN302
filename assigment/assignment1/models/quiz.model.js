import mongoose, { Types } from "mongoose";

const QuizzSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            require: true,
        },
    ],
});

const Quiz = mongoose.model("Quiz", QuizzSchema);

export default Quiz;