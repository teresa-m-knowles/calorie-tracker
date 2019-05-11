var express = require('express');
var router = express.Router();
var pry = require("pryjs")
var Meal = require("../../../models").Meal;
var Food = require("../../../models").Food;
var MealFood = require("../../../models").MealFood;

// GET all Meals and their associated Foods
router.get("/", function(req, res) {
  res.setHeader("Content-Type", "application/json");

  Meal.findAll({
  include: [
    {
    model: Food,
    as: 'foods',
    attributes: ["id", "name", "calories"],
    through: {
      attributes: []
    }
    }]
  })
    .then(meals => {
      res.status(200).send(JSON.stringify(meals));
    })
    .catch(error => {
      res.status(500).send({ error })
    });
});

// GET a single Meal and its Foods
router.get("/:id/foods", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");

  Meal.findMeal(req.params.id)
    .then(meal => {
      res.status(200).send(JSON.stringify(meal));
    })
    .catch(error => {
      res.status(404).send(error)
    })
});

// DELETE a Food from a Meal
router.delete("/:mealId/foods/:foodId", function(req, res){
  res.setHeader("Content-Type", "application/json");

  MealFood.deleteFood(req)
    .then(response => {
      res.sendStatus(204)
    })
    .catch(error => {
      res.status(404).send(error)
    })
});

router.post("/:id/foods/:foodId", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  let foundMeal, foundFood;

  Meal.findMeal(req.params.id)
    .then(meal => {
      foundMeal = meal
      return Food.findFood(req.params.foodId)
    })
    .then(food => {
      foundFood = food;
      return foundMeal.addFood(foundFood)
    })
    .then(mealFood => {
      res.status(201).send({message: `Successfully added ${foundFood.name} to ${foundMeal.name}`});
      })
    .catch(error => {
      res.status(404).send(error)
    })
});

function fourOhFour(res) {
  res.sendStatus(404);
};

module.exports = router;
