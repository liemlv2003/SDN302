import express from "express";
import Question from "../models/question.model.js";
import { idValidator } from "../middlewares/validator.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const question = await Question.create(req.body);
        res.status(201).send(question);
    } catch (error) {
        res.status(500).send({ message: error });
    }
});

router.get("/", async (req, res) => {
    try {
        const questions = await Question.find({});
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send({ message: error });
    }
});

router.get("/:id", idValidator, async (req, res) => {
    Question.findById(req.params.id)
        .then((q) => {
            if (q) return res.status(200).send(q);
            res.status(404).send({ message: "question not found" });
        })
        .catch((error) => res.status(500).send({ message: error }));
});

router.put("/:id", idValidator, async (req, res) => {
    try {
        const { text, options, keywords, correctAnswerIndex } = req.body;
        const updatedq = await Question.findByIdAndUpdate(
            req.params.id,
            {
                text,
                options,
                keywords,
                correctAnswerIndex,
            },
            { new: true }
        );
        if (!updatedq) {
            return res.status(404).send({ message: "question not found" });
        }
        res.status(200).send(updatedq);
    } catch (error) {
        res.status(500).send({ message: error });
    }
});

router.delete("/:id", idValidator, async (req, res) => {
    try {
        const result = await Question.findByIdAndDelete(req.params.id);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: error });
    }
});

export default router;