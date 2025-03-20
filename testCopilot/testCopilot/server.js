const express = require('express');
const mongoose = require('mongoose');
const validateFood = require('./middlewares/validateFood');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/shopeefood', { useNewUrlParser: true, useUnifiedTopology: true });

const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, enum: ['Beverage', 'Main Course', 'Dessert'] },
});

const Food = mongoose.model('Food', FoodSchema);

// GET all foods
app.get('/food', async (req, res) => {
    const foods = await Food.find();
    res.json(foods);
});

// GET food by ID
app.get('/food/:id', async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) return res.status(404).json({ error: 'Food item not found' });
        res.json(food);
    } catch (error) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
});

// POST new food
app.post('/food', validateFood, async (req, res) => {
    try {
        const newFood = new Food(req.body);
        await newFood.save();
        res.status(201).json(newFood);
    } catch (error) {
        res.status(500).json({ error: 'Error creating food item' });
    }
});

// PUT update food
app.put('/food/:id', validateFood, async (req, res) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFood) return res.status(404).json({ error: 'Food item not found' });
        res.json(updatedFood);
    } catch (error) {
        res.status(400).json({ error: 'Invalid request' });
    }
});

// DELETE food
app.delete('/food/:id', async (req, res) => {
    try {
        const deletedFood = await Food.findByIdAndDelete(req.params.id);
        if (!deletedFood) return res.status(404).json({ error: 'Food item not found' });
        res.json({ message: 'Food item deleted' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
});

app.listen(3000, () => console.log('Server is running on port 3000'));

module.exports = app;

