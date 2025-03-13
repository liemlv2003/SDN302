import express from "express";
import Quiz from "../models/quiz.model.js";
import { idValidator } from "../middlewares/validator.js";
import Question from "../models/question.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const quizz = await Quiz.create(req.body);
        res.status(201).send(quizz);
    } catch (error) {
        res.status(500).send({ message: error });
    }
});

router.get("/", async (req, res) => {
    try {
        const quizzes = await Quiz.find({});
        res.status(200).send(quizzes);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/:id", idValidator, async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate("questions"); 
        if (quiz) return res.status(200).send(quiz);
        res.status(404).send({ message: "Cannot find this quiz" });
    } catch (error) {
        res.status(500).send(error);
    }
});



router.put("/:id", idValidator, async (req, res) => {
    try {
        const { title, description, questions } = req.body;
        for (const element of questions) {
            const q = await Question.findById(element);
            if (!q) {
                return res.status(400).send({
                    message: `Question with ID ${element} does not exist. Please enter an existing one.`,
                });
            }
        }
        const updatedQ = await Quiz.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                questions,
            },
            {
                new: true,
            }
        );
        if (!updatedQ) {
            return res.status(404).send({ message: "Quiz not found" });
        }
        res.status(200).send(updatedQ);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:id", idValidator, async (req, res) => {
    try {
        const result = await Quiz.findByIdAndDelete(req.params.id);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: error });
    }
});
export default router;