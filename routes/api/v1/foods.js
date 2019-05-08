var express = require("express");
var router = express.Router();
var Food = require("../../../models").Food;

router.get("/", function (req, res) {
  Food.findAll()
    .then(foods => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(foods));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error })
    });
});

router.get("/:id", function(req, res) {
  Food.findByPk(req.params.id)
    .then(foodItem => {
      res.setHeader("Content-Type", "application/json")
      foodItem ? res.status(200).send(JSON.stringify(foodItem)) : res.sendStatus(404);
    })
    .catch(error => {
      res.status(500).send({ error })
    });
})

router.post("/", function(req, res) {
  Food.create(
    {
      name: req.body.food.name,
      calories: req.body.food.calories
    }
  )
    .then(foodItem => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(foodItem));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

module.exports = router;
