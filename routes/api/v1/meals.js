var express = require("express");
var router = express.Router();
var pry = require("pryjs");
var Meal = require("../../../models").Meal;
var Food = require("../../../models").Food;

router.get("/:id/foods", function (req, res, next) {
  Meal.findOne({
    where: {id: req.params.id},
    attributes: ['id', 'name'],
    include: [{
      model: Food,
      as: 'foods',
      attributes: ['id', 'name', 'calories']
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

router.post("/:id/foods/:food_id", function (req, res, next) {
  Meal.findByPk(req.params.id)
    .then(meal => {
      Food.findByPk(req.params.food_id)
        .then(food => {
          meal.addFood(food);
          res.setHeader("Content-Type", "application/json");
          res.status(201).send({message: `Successfully added ${food.name} to ${meal.name}`});
        })
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error })
    });
});

module.exports = router;
