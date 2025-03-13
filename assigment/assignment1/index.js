import express from "express";
import mongoose from "mongoose";
import question from "./routes/question.js";
import quiz from "./routes/quizzes.js";
import cors from "cors";
const app = express();
const port = 3000;
app.use(cors());


app.use(express.json());
app.use("/api/question", question);
app.use("/api/quizzes", quiz);

mongoose.connect("mongodb://localhost:27017/SimpleQuiz").then(() => {
    console.log("connected to database");
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});