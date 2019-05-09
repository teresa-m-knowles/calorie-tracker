var express = require('express');
var router = express.Router();
var pry = require("pryjs")
var Meal = require("../../../models").Meal;
var Food = require("../../../models").Food;
var MealFood = require("../../../models").MealFood;

// GET all Meals and their associated Foods
router.get("/", function(req, res) {
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
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(meals));
    })
    .catch(error => {
      console.log(error)
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error })
    });
});

// GET a single Meal and its Foods
router.get("/:id/foods", function (req, res, next) {
  Meal.findOne({
    where: {id: req.params.id},
    attributes: ['id', 'name'],
    include: [{
      model: Food,
      as: 'foods',
      attributes: ['id', 'name', 'calories'],
      through: {
         attributes: []
              }
    }]
  })
    .then(meal => {
      if (meal !== null) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(meal));
      } else {
        res.setHeader("Content-Type", "application/json");
        res.sendStatus(404);
      }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error })
    });
});

module.exports = router;
